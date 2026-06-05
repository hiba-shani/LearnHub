import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InstructorDashboard() {

  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      // ✅ COURSES
      const courseRes = await axios.get(
        `${API}/api/courses/instructor/my-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(courseRes.data.courses);

      // ✅ STATS
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

  // DELETE COURSE
  const deleteCourse = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure want to delete this course?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API}/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Course Deleted 🗑️");
      fetchData();

    } catch (error) {
      console.log(error);
      alert("Delete failed ❌");
    }
  };

  if (!stats) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Instructor Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">

        <div className="bg-blue-500 text-white p-4 rounded">
          <h2>Total Courses</h2>
          <p className="text-2xl font-bold">{stats.totalCourses}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          <h2>Total Students</h2>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded">
          <h2>Total Revenue</h2>
          <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          <h2>Total Lessons</h2>
          <p className="text-2xl font-bold">{stats.totalLessons}</p>
        </div>

      </div>

      {/* COURSES */}
      <h2 className="text-2xl font-bold mb-6">
        My Courses
      </h2>

      {courses.length === 0 ? (
        <p>No Courses Found</p>
      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {courses.map((course) => (

            <div
              key={course._id}
              className="border rounded shadow p-4"
            >

              <img
                src={`${API}/uploads/${course.image}`}
                alt={course.title}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-4">
                {course.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {course.shortDescription}
              </p>

              <p className="text-blue-600 font-bold mt-2">
                ₹{course.price}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-4 flex-wrap">

                <button
                  onClick={() =>
                    navigate(`/create-lesson/${course._id}`)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add Lesson
                </button>

                <button
                  onClick={() =>
                    navigate(`/edit-course/${course._id}`)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCourse(course._id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default InstructorDashboard;