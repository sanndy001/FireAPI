const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB2XTgjoU6pMz5sA01ho6fitRRI0sL5Tcg",
  authDomain: "my-react-project-a1499.firebaseapp.com",
  projectId: "my-react-project-a1499",
  storageBucket: "my-react-project-a1499.appspot.com",
  messagingSenderId: "623999445906",
  appId: "1:623999445906:web:da22b7d2c2579cabf16f4b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const server = express();
server.use(cors());
server.use(bodyParser.json());

// User registration endpoint
server.post("/register", async (req, res) => {
  const { email, password, username, dob } = req.body;

  if (!email || !password || !username || !dob) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const q = query(collection(db, "profiles"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const userDocRef = await addDoc(collection(db, "profiles"), {
      email,
      password: hashedPassword,
      username,
      dob,
    });

    res.json({
      message: "User registered successfully!",
      userId: userDocRef.id,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// User login endpoint
server.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const q = query(collection(db, "profiles"), where("email", "==", email));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    let user;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, username: user.username, dob: user.dob },
      "your-secret-key",
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

server.post("/api/setup-user", async (req, res) => {
  const { username, userId, dob, address } = req.body;

  if (!username || !userId || !dob || !address) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const docRef = await addDoc(collection(db, "users"), {
      username,
      userId,
      dob,
      address,
    });
    res.status(201).send({ id: docRef.id, message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res
      .status(500)
      .send({ message: "Error adding user", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
