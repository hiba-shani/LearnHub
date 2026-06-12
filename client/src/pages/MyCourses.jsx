import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Swal from "sweetalert2";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6; 

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isInstructor = user.role === "instructor";
  const API = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const deleteCourse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API}/api/courses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchMyCourses();
          Swal.fire("Deleted!", "Course has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Pagination 
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">My Courses</h1>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length > 0 ? (
        <>
          <div className="grid md:grid-cols-3 gap-8">
            {currentCourses.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <CourseCard course={course} />
                
                {isInstructor && (
                  <div className="p-4 flex gap-2 border-t mt-auto">
                    <button onClick={() => navigate(`/instructor/add-lesson/${course._id}`)} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-xs hover:bg-green-700">Add Lesson</button>
                    <button onClick={() => navigate(`/instructor/edit-course/${course._id}`)} className="flex-1 bg-yellow-500 text-white py-2 rounded-xl text-xs hover:bg-yellow-600">Edit</button>
                    <button onClick={() => deleteCourse(course._id)} className="flex-1 bg-red-600 text-white py-2 rounded-xl text-xs hover:bg-red-700">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50">Prev</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 border rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"}`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50">Next</button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold">No Courses Found</h2>
        </div>
      )}
    </div>
  );
}

export default MyCourses;