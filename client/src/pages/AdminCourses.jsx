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
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  }, [page]);

  const deleteCourse = async (id) => {

    const result = await Swal.fire({
      title: "Delete Course?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626"
    });

    if (!result.isConfirmed) return;

    try {

      await axios.delete(
        `${API}/api/admin/course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire(
        "Deleted",
        "Course deleted successfully",
        "success"
      );

      fetchCourses();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Course Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all courses, lessons and course content
          </p>
        </div>

        <button
          onClick={() => navigate("/create-course")}
          className="
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      shadow-lg
      hover:scale-105
      transition
    "
        >
          + Create Course
        </button>

      </div>
      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-100">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Instructor
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {courses.map((course) => (

              <tr
                key={course._id}
                className="border-b"
              >

                <td className="p-4">

                  <img
                    src={course.image}
                    alt={course.title}
                    className="
    w-24
    h-16
    object-cover
    rounded-xl
    border
  "
                  />

                </td>

                <td className="p-4 font-semibold">
                  {course.title}
                </td>

                <td className="p-4">
                  {course.instructor?.name || "N/A"}
                </td>

                <td className="p-4">
                  {course.category}
                </td>

                <td className="p-4">
                  ₹{course.price}
                </td>

                <td className="p-4">

                  <div className="flex gap-2 flex-wrap">

                    <button
                      onClick={() =>
                        navigate(`/edit-course/${course._id}`)
                      }
                      className="
      bg-amber-500
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-amber-600
      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/add-lesson/${course._id}`)
                      }
                      className="
      bg-green-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-green-700
      "
                    >
                      Add Lesson
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/lessons/${course._id}`)
                      }
                      className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-blue-700
      "
                    >
                      View Lessons
                    </button>

                    <button
                      onClick={() =>
                        deleteCourse(course._id)
                      }
                      className="
      bg-red-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-red-700
      "
                    >
                      Delete
                    </button>

                  </div>

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

export default AdminCourses;