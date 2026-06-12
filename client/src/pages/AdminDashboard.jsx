import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  
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

  useEffect(() => {

    fetchStats();

  }, []);

  if (!stats) {

    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );

  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h2>Total Users</h2>
          <p className="text-3xl font-bold">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h2>Total Students</h2>
          <p className="text-3xl font-bold">
            {stats.totalStudents}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h2>Total Instructors</h2>
          <p className="text-3xl font-bold">
            {stats.totalInstructors}
          </p>
        </div>

        <div className="bg-orange-600 text-white p-6 rounded-2xl shadow-lg">
          <h2>Total Courses</h2>
          <p className="text-3xl font-bold">
            {stats.totalCourses}
          </p>
        </div>

        <div className="bg-pink-600 text-white p-6 rounded-2xl shadow-lg">
          <h2>Total Revenue</h2>
          <p className="text-3xl font-bold">
            ₹{stats.revenue}
          </p>
        </div>

        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <h2>Total Enrollments</h2>
          <p className="text-3xl font-bold">
            {stats.enrollments}
          </p>
        </div>

      </div>

      
       
    

    </div>

  );

}

export default AdminDashboard;