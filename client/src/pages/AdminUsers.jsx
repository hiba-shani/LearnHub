import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        `${API}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        All Users
      </h1>

      <div className="grid gap-6">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white shadow-lg rounded-2xl p-6 border"
          >

            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {user.email}
            </p>

            <p className="mt-2">
              Role:
              <span className="font-semibold ml-2">
                {user.role}
              </span>
            </p>

            <p className="mt-2">
              Status:
              <span className={`ml-2 font-bold ${
                user.isBlocked ? "text-red-600" : "text-green-600"
              }`}>
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminUsers;