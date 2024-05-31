import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8383/users");
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="fixed h-full w-full"><h2>Loading...</h2></div>;
  }

  if (error) {
    return <div className="fixed h-full w-full"><h2>{error}</h2></div>;
  }

  return (
    <div className="fixed h-full w-full overflow-auto" style={{ zIndex: "10" }}>
      <div style={{ zIndex: "1", width: "70%", maxHeight: "80vh", overflowY: "auto" }}>
        <h2 className="font-semibold text-xl">List of All Users</h2> <br/>
        {users.length > 0 ? (
          <div>
            {users.map((userSet, index) => (
              <div key={index} className="mb-4" style={{ border: "2px solid #8A6E2F", padding: "10px", width: "90%" }}>
                <h3 className="text-lg font-semibold">User Set {index + 1}</h3>
                <ul>
                  <li>
                    <p>Name: {userSet.details.Name}</p>
                    <p>Business Name: {userSet.details.BusinessName}</p>
                    <p>Location: {userSet.details.Location}</p>
                    <p>Nature of Business: {userSet.details.NatureOfBusiness}</p>
                    <p>Phone Number: {userSet.details.PhNo}</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <h1>No Users Found!</h1>
        )}
      </div>
    </div>
  );
};

export default User;
