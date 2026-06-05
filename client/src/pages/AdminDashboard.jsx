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
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    fetchStats();
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      Swal.fire({
        title: "Approved!",
        text: "Instructor approved successfully.",
        icon: "success",
        confirmButtonColor: "#10B981"
      });
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
      Swal.fire({
        title: "Rejected!",
        text: "Instructor rejected successfully.",
        icon: "success",
        confirmButtonColor: "#EF4444"
      });
      fetchPending();
    } catch (error) {
      console.log(error);
    }
  };

  // BLOCK USER
  const blockUser = async (id) => {
    try {
      await axios.put(
        `${API}/api/admin/block-user/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Blocked", "User blocked successfully", "success");
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  // UNBLOCK USER
  const unblockUser = async (id) => {
    try {
      await axios.put(
        `${API}/api/admin/unblock-user/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Unblocked", "User unblocked successfully", "success");
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE COURSE
  const deleteCourse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! All lessons under this course might be affected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", 
      cancelButtonColor: "#6B7280", 
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${API}/api/admin/course/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          Swal.fire({
            title: "Deleted!",
            text: "Course has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#4F46E5"
          });

          fetchStats();
          fetchCourses(); 
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Delete Failed",
            text: error.response?.data?.message || "Could not delete the course.",
            icon: "error",
            confirmButtonColor: "#EF4444"
          });
        }
      }
    });
  };

  if (!stats) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* USERS QUICK ACTIONS */}
      <div className="flex gap-4 mb-8">
        <Link to="/admin/users" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          View Users List
        </Link>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow">
          <h2 className="text-lg opacity-90">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
          <h2 className="text-lg opacity-90">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalCourses}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
          <h2 className="text-lg opacity-90">Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹{stats.revenue}</p>
        </div>
      </div>

      {/* PENDING INSTRUCTORS LIST */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-orange-600">Pending Instructors Approval</h2>
      {pending.length === 0 ? (
        <p className="text-gray-500 bg-gray-50 p-4 rounded-xl border border-dashed mb-10">No pending approval requests.</p>
      ) : (
        <div className="grid gap-4 mb-10">
          {pending.map((instructor) => (
            <div key={instructor._id} className="border border-orange-100 p-4 rounded-xl flex justify-between items-center bg-orange-50 shadow-sm">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{instructor.name}</h3>
                <p className="text-gray-500 text-sm">{instructor.email}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => approveInstructor(instructor._id)} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Approve
                </button>
                <button 
                  onClick={() => rejectInstructor(instructor._id)} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4 text-red-600">Quick User Management</h2>
      <div className="bg-gray-50 p-4 rounded-xl border mb-10 flex flex-wrap gap-4 items-center">
        <p className="text-sm text-gray-600 mr-2">To block/unblock a specific user quickly, please visit the main Users page:</p>
        <Link to="/admin/users" className="text-indigo-600 font-bold hover:underline text-sm">
          Go to All Users Menu →
        </Link>
       
        <div className="hidden">
          <button onClick={() => blockUser("")}>Block</button>
          <button onClick={() => unblockUser("")}>Unblock</button>
        </div>
      </div>

      {/* COURSES */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Courses</h2>
      <div className="grid gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm">
            <div>
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-indigo-600 font-semibold">₹{course.price}</p>
            </div>

            <div className="flex gap-3">
              {/* ✏️ ADDED: EDIT COURSE BUTTON */}
              <button 
                onClick={() => navigate(`/edit-course/${course._id}`)} 
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl transition font-semibold"
              >
                Edit
              </button>
              
              <button onClick={() => navigate(`/add-lesson/${course._id}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
                Add Lesson
              </button>
              <button onClick={() => deleteCourse(course._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center gap-4 mt-8 justify-center">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-5 py-2 rounded-xl transition">
          Previous
        </button>
        <p className="font-semibold">Page {page} of {pages}</p>
        <button disabled={page === pages} onClick={() => setPage(page + 1)} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-xl transition">
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;