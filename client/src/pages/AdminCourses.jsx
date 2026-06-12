import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/courses?page=${page}&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCourses(res.data.courses);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const deleteCourse = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API}/api/admin/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire("Deleted!", "Course has been removed.", "success");
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
          <p className="text-gray-500">Manage all courses and course content</p>
        </div>
        <button
          onClick={() => navigate("/create-course")}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          + Create Course
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Image</th>
              <th className="p-4 font-semibold text-gray-600">Title</th>
              <th className="p-4 font-semibold text-gray-600">Instructor</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4">
                  <img src={course.image} alt={course.title} className="w-20 h-12 object-cover rounded-lg border" />
                </td>
                <td className="p-4 font-medium text-gray-800">{course.title}</td>
                <td className="p-4 text-gray-600">{course.instructor?.name || "N/A"}</td>
                <td className="p-4 text-gray-600">{course.category}</td>
                <td className="p-4 font-semibold text-indigo-600">₹{course.price}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(`/course/${course._id}`)} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-600">View</button>
                    <button onClick={() => navigate(`/edit-course/${course._id}`)} className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-amber-600">Edit</button>
                    <button onClick={() => navigate(`/add-lesson/${course._id}`)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700">Lesson+</button>
                    <button onClick={() => deleteCourse(course._id)} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-white border px-4 py-2 rounded-lg shadow-sm disabled:opacity-50">Previous</button>
        <span className="font-bold text-gray-700">{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-white border px-4 py-2 rounded-lg shadow-sm disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default AdminCourses;