import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2XTgjoU6pMz5sA01ho6fitRRI0sL5Tcg",
  authDomain: "my-react-project-a1499.firebaseapp.com",
  projectId: "my-react-project-a1499",
  storageBucket: "my-react-project-a1499.appspot.com",
  messagingSenderId: "623999445906",
  appId: "1:623999445906:web:da22b7d2c2579cabf16f4b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
