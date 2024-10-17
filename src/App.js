import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Register from "./components/Register";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Dashboard = ({ refresh, handleUserAdded }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    checkTokenValidity();
    const handleUserInteraction = () => {
      checkTokenValidity();
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [checkTokenValidity]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Come again soon");
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1 className="sand">Firebase & API call</h1>
        {user && <p>Welcome, {user.username}</p>}
      </div>
      <div className="boody">
        <div className="container">
          <AddUser onUserAdded={handleUserAdded} />
          <br />
          <div>
            {" "}
            <button onClick={handleLogout}>Logout</button>{" "}
          </div>
        </div>
        <div className="userlist">
          {" "}
          <UserList refresh={refresh} />{" "}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard refresh={refresh} handleUserAdded={handleUserAdded} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
