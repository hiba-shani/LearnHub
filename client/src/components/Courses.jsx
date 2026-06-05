import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import SearchBar from "./SearchBar";
import axios from "axios";
import { Link } from "react-router-dom";

function Courses({ limit }) {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const courseLimit = limit || 8;

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/api/courses?search=${search}&page=${page}&limit=${courseLimit}`
        );

        setCourses(res.data.courses);
        setPages(res.data.pages);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCourses();

  }, [search, limit, page]);

  return (
    <section className="bg-gray-50 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-gray-800">
            Our Courses
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Learn from industry experts and build real-world skills
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-16 flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBar setSearch={setSearch} />
          </div>
        </div>

        {/* COURSES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {loading ? (
            <div className="col-span-full text-center text-xl text-gray-500">
              Loading...
            </div>
          ) : courses?.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="transform hover:-translate-y-2 transition-all duration-300">
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              😕 No courses found.
            </div>
          )}

        </div>

        {/* PAGINATION */}
        {!limit && pages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16 flex-wrap">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-5 py-2 rounded-xl font-semibold ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Prev
            </button>

            {[...Array(pages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  page === index + 1
                    ? "bg-indigo-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pages}
              className={`px-5 py-2 rounded-xl font-semibold ${
                page === pages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next
            </button>

          </div>
        )}

        {/* VIEW ALL */}
        {limit && (
          <div className="mt-20 text-center">
            <Link
              to="/courses"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              View All Courses
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

export default Courses;