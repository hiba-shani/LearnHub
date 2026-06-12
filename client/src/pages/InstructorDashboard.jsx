import { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      //  COURSES
      const courseRes = await axios.get(
        `${API}/api/courses/instructor/my-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(courseRes.data.courses);

      
      const statsRes = await axios.get(
        `${API}/api/courses/instructor/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(statsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // DELETE COURSE 
  const deleteCourse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this course? This action cannot be undone!",
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
            `${API}/api/courses/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          Swal.fire({
            title: "Deleted!",
            text: "Course has been deleted successfully 🗑️",
            icon: "success",
            confirmButtonColor: "#4F46E5"
          });

          fetchData(); 
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

  if (!stats) {
    return <p className="p-8 text-center mt-20">Loading...</p>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Instructor Dashboard
      </h1>

      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
          <h2 className="opacity-90">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalCourses}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-sm">
          <h2 className="opacity-90">Total Students</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalStudents}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-sm">
          <h2 className="opacity-90">Total Lessons</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalLessons}</p>
        </div>
      </div>

      
    </div>
  );
}

export default InstructorDashboard;