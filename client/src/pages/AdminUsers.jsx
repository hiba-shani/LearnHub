import { useEffect, useState } from "react"; 
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">All Users</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 mt-1">{user.email}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                <p className="text-gray-600">
                  Role: <span className="font-semibold text-gray-800 uppercase tracking-wider text-xs bg-gray-150 px-2.5 py-1 rounded-md">{user.role}</span>
                </p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span className={`font-bold ${user.isBlocked ? "text-red-600" : "text-green-600"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2 py-10">No users found</p>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;