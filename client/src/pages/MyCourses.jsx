import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import CourseCard from "../components/CourseCard";
import Swal from "sweetalert2"; 

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  
  const user = JSON.parse(localStorage.getItem("user") || "{}"); 
  const isInstructor = user.role === "instructor"; 

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/courses/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.courses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  const deleteCourse = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${API}/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchMyCourses();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">My Courses</h1>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <CourseCard course={course} />
              
              {/* instructor */}
              {isInstructor && (
                <div className="p-4 flex gap-2 border-t">
                  <button 
                    onClick={() => navigate(`/instructor/add-lesson/${course._id}`)}
                    className="flex-1 bg-green-600 text-white py-1 rounded text-sm hover:bg-green-700"
                  >
                    Add Lesson
                  </button>
                  <button 
                    onClick={() => navigate(`/instructor/edit-course/${course._id}`)}
                    className="flex-1 bg-yellow-500 text-white py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteCourse(course._id)}
                    className="flex-1 bg-red-600 text-white py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No Courses Found</p>
      )}
    </div>
  );
}

export default MyCourses;