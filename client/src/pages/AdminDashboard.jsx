import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);


  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

 useEffect(() => {
    fetchStats();
    fetchPending();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (error) { console.log(error); }
  };

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/pending-instructors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPending(res.data);
    } catch (error) { console.log(error); }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) { console.log(error); }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/api/courses?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data.courses);
      setPage(res.data.pages);
    } catch (error) { console.log(error); }
  };

  const approveInstructor = async (id) => {
    await axios.put(`${API}/api/admin/approve-instructor/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      });

    Swal.fire("Approved!", "", "success");
    fetchPending();
  };

  const rejectInstructor = async (id) => {
    await axios.delete(`${API}/api/admin/reject-instructor/${id}`,
      {
        headers:
          { Authorization: `Bearer ${token}` }
      });

    Swal.fire("Rejected!", "", "success");
    fetchPending();
  };

  const toggleBlockStatus = async (id, isBlocked) => {
    const endpoint = isBlocked ? `/api/admin/unblock-user/${id}` : `/api/admin/block-user/${id}`;
    await axios.put(`${API}${endpoint}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    Swal.fire("Success", `User ${isBlocked ? "Unblocked" : "Blocked"}`, "success");
    fetchUsers();
  };

  const deleteCourse = async (id) => {
    const result = await Swal.fire({ title: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonColor: "#EF4444" });
    if (result.isConfirmed) {
      await axios.delete(`${API}/api/admin/course/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      Swal.fire("Deleted!", "", "success");
      fetchCourses();
      fetchStats();
    }
  };

  if (!stats) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow"><h2 className="text-lg">Total Users</h2><p className="text-3xl font-bold">{stats.totalUsers}</p></div>
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow"><h2 className="text-lg">Total Courses</h2><p className="text-3xl font-bold">{stats.totalCourses}</p></div>
        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow"><h2 className="text-lg">Total Revenue</h2><p className="text-3xl font-bold">₹{stats?.revenue || 0}</p></div>
      </div>

      {/* PENDING INSTRUCTORS */}
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Pending Instructors</h2>
      <div className="grid gap-4 mb-10">
        {pending.map(inst => (
          <div key={inst._id} className="border p-4 rounded-xl flex justify-between items-center bg-orange-50 shadow-sm">
            <div><h3 className="font-bold">{inst.name}</h3><p className="text-sm">{inst.email}</p></div>
            <div className="flex gap-2">
              <button onClick={() => approveInstructor(inst._id)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Approve</button>
              <button onClick={() => rejectInstructor(inst._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK USER MANAGEMENT */}
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="grid gap-4 mb-10">
        {users.slice(0, 5).map(user => (
          <div key={user._id} className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm">
            <div><p className="font-bold">{user.name}</p><p className="text-sm">{user.email}</p></div>
            <button onClick={() => toggleBlockStatus(user._id, user.isBlocked)} className={`${user.isBlocked ? "bg-green-600" : "bg-red-600"} text-white px-4 py-2 rounded-lg`}>
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>

      {/* COURSES */}
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid gap-4">
        {courses.map(course => (
          <div key={course._id} className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm">
            <div><h3 className="font-bold">{course.title}</h3><p className="text-indigo-600">₹{course.price}</p></div>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/edit-course/${course._id}`)} className="bg-amber-500 text-white px-4 py-2 rounded-lg">Edit</button>
              <button onClick={() => deleteCourse(course._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;