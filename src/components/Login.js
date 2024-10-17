import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const toggleShowPassword = () => {
    setShowpassword(!showpassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      toast.success(`Logged in successfully!`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid Credentials !!");
    }
  };

  return (
    <div>
      <h1 className="registerh1">Login-Page</h1>
      <form onSubmit={handleLogin}>
        <label>Email-ID:</label>
        <input
          placeholder="Enter the email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />

        <label>Password:</label>
        <div class="password-input-wrapper">
          <input
            placeholder="Enter the password"
            type={showpassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <span
            className="show"
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

        <div className="yutton">
          <button type="submit">Login</button>
          <br />
        </div>
        <h4 className="logger">
          New User? <a href="/">Sign up</a>
        </h4>
      </form>
    </div>
  );
};

export default Login;
