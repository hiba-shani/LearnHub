
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStats();
    fetchPending();
    fetchCourses();
  }, [page]);

  // COURSES
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `${API}/api/courses?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(res.data.courses);
      setPages(res.data.pages);

    } catch (error) {
      console.log(error);
    }
  };

  // PENDING INSTRUCTORS
  const fetchPending = async () => {
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

  // STATS
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE
  const approveInstructor = async (id) => {
    try {
      await axios.put(
        `${API}/api/admin/approve-instructor/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Approved", "Instructor approved successfully", "success");

      fetchStats();
      fetchPending();

    } catch (error) {
      console.log(error);
    }
  };

  // REJECT
  const rejectInstructor = async (id) => {
    try {
      await axios.delete(
        `${API}/api/admin/reject-instructor/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Rejected", "Instructor rejected successfully", "success");

      fetchPending();

    } catch (error) {
      console.log(error);
    }
  };

  // BLOCK
  const blockUser = async (id) => {
    try {
      await axios.put(
        `${API}/api/admin/block-user/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Blocked", "", "success");
      fetchStats();

    } catch (error) {
      console.log(error);
    }
  };

  // UNBLOCK
  const unblockUser = async (id) => {
    try {
      await axios.put(
        `${API}/api/admin/unblock-user/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Unblocked", "", "success");
      fetchStats();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE COURSE
  const deleteCourse = async (id) => {

    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/api/admin/course/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Course deleted ✅");
      fetchStats();

    } catch (error) {
      console.log(error);
      alert("Delete failed ❌");
    }
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* USERS */}
      <div className="flex gap-4 mb-8">
        <Link to="/admin/users" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
          View Users
        </Link>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-500 text-white p-4 rounded">
          <h2>Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          <h2>Total Courses</h2>
          <p className="text-2xl font-bold">{stats.totalCourses}</p>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded">
          <h2>Revenue</h2>
          <p className="text-2xl font-bold">₹{stats.revenue}</p>
        </div>
      </div>

      {/* COURSES */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Courses</h2>

      {courses.map((course) => (
        <div key={course._id} className="border p-4 rounded flex justify-between items-center mb-3">

          <div>
            <h3 className="font-bold">{course.title}</h3>
            <p>₹{course.price}</p>
          </div>

          <div>
            <button onClick={() => navigate(`/add-lesson/${course._id}`)} className="bg-blue-600 text-white px-4 py-2 rounded mr-3">
              Add Lesson
            </button>

            <button onClick={() => deleteCourse(course._id)} className="bg-red-600 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>

        </div>
      ))}

      {/* PAGINATION */}
      <div className="flex gap-4 mt-8">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-500 text-white px-5 py-2 rounded">
          Previous
        </button>

        <p>Page {page} of {pages}</p>

        <button disabled={page === pages} onClick={() => setPage(page + 1)} className="bg-blue-600 text-white px-5 py-2 rounded">
          Next
        </button>
      </div>

    </div>
  );
}



export default AdminDashboard;