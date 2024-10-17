import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    const fetchUsers = async () => {
      // Add 3 seconds delay
      setTimeout(async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const usersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          usersList.sort((a, b) => a.username.localeCompare(b.username));

          setUsers(usersList);
        } catch (error) {
          console.error("Error fetching users: ", error);
          toast.error("Error fetching users");
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      }, 3000); // 3 seconds delay
    };

    fetchUsers();
  }, [refresh]);

  const handleclick = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Failed to delete the user");
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <InfinitySpin
          visible={true}
          width="200"
          color="#ff0000"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <div className="sawdust">
      <h2 className="dust">User List</h2>
      <ol className="sawd">
        {users.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.username} <br />
            <strong>ID:</strong> {user.userId} <br />
            <strong>Date of Birth:</strong> {user.dob} <br />
            <strong>Location:</strong> {user.address} <br />
            <MdDeleteForever
              type="button"
              size="30px"
              onClick={() => handleclick(user.id)}
              className="delico"
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserList;
