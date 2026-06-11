import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AdminInstructors() {

  const [pending, setPending] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchPendingInstructors = async () => {

    try {

      const res = await axios.get(
        `${API}/api/admin/pending-instructors`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPending(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchInstructors = async () => {

    try {

      const res = await axios.get(
        `${API}/api/admin/instructors?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setInstructors(res.data.instructors);
      setTotalPages(res.data.pages);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchPendingInstructors();

  }, []);

  useEffect(() => {

    fetchInstructors();

  }, [page]);

  const approveInstructor = async (id) => {

    try {

      await axios.put(
        `${API}/api/admin/approve-instructor/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire(
        "Approved",
        "Instructor Approved Successfully",
        "success"
      );

      fetchPendingInstructors();
      fetchInstructors();

    } catch (error) {

      console.log(error);

    }

  };

  const rejectInstructor = async (id) => {

    try {

      await axios.delete(
        `${API}/api/admin/reject-instructor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire(
        "Rejected",
        "Instructor Rejected",
        "success"
      );

      fetchPendingInstructors();

    } catch (error) {

      console.log(error);

    }

  };

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
          ? "Instructor Unblocked"
          : "Instructor Blocked",
        "success"
      );

      fetchInstructors();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Instructor Management
      </h1>

      {/* Pending Instructors */}

      <h2 className="text-2xl font-bold mb-4 text-orange-600">
        Pending Instructors
      </h2>

      <div className="grid gap-4 mb-10">

        {pending.length > 0 ? (

          pending.map((inst) => (

            <div
              key={inst._id}
              className="bg-orange-50 border rounded-xl p-4 flex justify-between items-center"
            >

              <div>

                <h3 className="font-bold">
                  {inst.name}
                </h3>

                <p>
                  {inst.email}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    approveInstructor(inst._id)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectInstructor(inst._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        ) : (

          <p>No Pending Instructors</p>

        )}

      </div>

      {/* Approved Instructors */}

      <h2 className="text-2xl font-bold mb-4">
        Approved Instructors
      </h2>

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
                Courses
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

            {instructors.map((inst) => (

              <tr
                key={inst._id}
                className="border-b"
              >

                <td className="p-4">
                  {inst.name}
                </td>

                <td className="p-4">
                  {inst.email}
                </td>

                <td className="p-4">
                  {inst.totalCourses}
                </td>

                <td className="p-4">

                  {inst.isBlocked ? (

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
                        inst._id,
                        inst.isBlocked
                      )
                    }
                    className={`px-4 py-2 rounded-lg text-white ${
                      inst.isBlocked
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >

                    {inst.isBlocked
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

export default AdminInstructors;