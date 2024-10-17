import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddUser = ({ onUserAdded }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && userId && dob && address) {
      console.log("Attempting to add user:", {
        username,
        userId,
        dob,
        address,
      });
      try {
        const response = await axios.post(
          "http://localhost:5000/api/setup-user",
          { username, userId, dob, address },
        );
        console.log("User added successfully:", response.data);
        toast.success(`User ${username} registered successfully!`);

        setUsername("");
        setUserId("");
        setDob("");
        setAddress("");

        if (onUserAdded) onUserAdded();
      } catch (error) {
        console.error(
          "Error adding user:",
          error.response ? error.response.data : error.message,
        );
        toast.error("Error adding user.");
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  return (
    <div className="Adduser">
      <h2 className="ust">Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="urus">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
