import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        `${API}/api/admin/users?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data.users);
      setTotalPages(res.data.pages);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [page]);

  const toggleBlockStatus = async (
    id,
    isBlocked
  ) => {

    try {

      const endpoint = isBlocked
        ? `/api/admin/unblock-user/${id}`
        : `/api/admin/block-user/${id}`;

      await axios.put(
        `${API}${endpoint}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire(
        "Success",
        isBlocked
          ? "User Unblocked"
          : "User Blocked",
        "success"
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        User Management
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4 capitalize">
                  {user.role}
                </td>

                <td className="p-4">

                  {user.isBlocked ? (

                    <span className="text-red-600 font-bold">
                      Blocked
                    </span>

                  ) : (

                    <span className="text-green-600 font-bold">
                      Active
                    </span>

                  )}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      toggleBlockStatus(
                        user._id,
                        user.isBlocked
                      )
                    }
                    className={`px-4 py-2 rounded-lg text-white ${
                      user.isBlocked
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >

                    {user.isBlocked
                      ? "Unblock"
                      : "Block"}

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="bg-gray-500 text-white px-5 py-2 rounded-xl disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-bold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-xl disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}

export default AdminUsers;