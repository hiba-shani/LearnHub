import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ VITE API BASE URL
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/courses/my-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(res.data.courses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        My Courses
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">

          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <CourseCard course={course} />
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

          <h2 className="text-2xl font-bold">
            No Courses Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't enrolled or created any courses yet.
          </p>

        </div>
      )}

    </div>
  );
}

export default MyCourses;