import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const toggleShowPassword = () => {
    setShowpassword(!showpassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !dob || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        email,
        password,
        username: name,
        dob,
      });
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already exists"
      ) {
        toast.error("This user already exists. Please click Login!");
        // navigate('/login');
      } else {
        toast.error("Registration failed, please try again.");
      }
    }
  };

  return (
    <div>
      <h1 className="registerh1">Registration-Page</h1>
      <form onSubmit={handleRegister}>
        <label>Name:</label>
        <input
          placeholder="Enter your Name"
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />

        <label>Email-ID:</label>
        <input
          placeholder="Enter your Email-id"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />

        <label>Date of Birth:</label>
        <input
          placeholder="Enter your Date of Birth"
          type="date"
          onChange={(e) => setDob(e.target.value)}
          value={dob}
        />
        <br />

        <div class="password-input-wrappr">
          <label>Password:</label>
          <input
            placeholder="Enter the Password"
            type={showpassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <span
            className="show-password-icon"
            onClick={toggleShowPassword}
            style={{ cursor: "pointer" }}
          >
            {showpassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>

        <label>Confirm Password:</label>
        <input
          placeholder="Enter the Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <br />

        <div className="yutton">
          {" "}
          <button type="submit">Click to Register</button>
          <br />
        </div>

        <h4 className="logger">
          Already a User? <a href="/Login">Login</a>
        </h4>
      </form>
    </div>
  );
};

export default Register;
