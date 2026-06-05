<<<<<<< HEAD
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/courses?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 lg:py-24 px-4 lg:px-6">

        {/* LEFT SIDE */}
        <div className="relative z-10 text-center lg:text-left">

          <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20">
            🚀 100+ Premium Online Courses
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-tight mt-6 lg:mt-8">
            Learn Skills <br />
            Build Your <span className="text-yellow-300"> Dream Career</span>
          </h1>

          <p className="text-sm md:text-lg text-gray-100 mt-6 lg:mt-8 leading-7 lg:leading-9 max-w-2xl mx-auto lg:mx-0">
            Master coding, marketing, business, design, and more with expert instructors and real-world projects.
          </p>

          {/* SEARCH */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center mt-8 shadow-2xl max-w-2xl mx-auto lg:mx-0">

            <input
              type="text"
              placeholder="Search your favorite course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 sm:py-4 outline-none text-black rounded-xl"
            />

            <button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 sm:py-4 rounded-xl transition flex items-center justify-center gap-2 mt-2 sm:mt-0"
            >
              <FaSearch />
              Search
            </button>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

            <button
              onClick={() => navigate("/courses")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition"
            >
              Explore Courses
            </button>

            <button
              onClick={() => navigate("/about")}
              className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Learn More
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative mt-8 lg:mt-0">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Hero"
            className="rounded-3xl shadow-2xl w-full h-[350px] sm:h-[450px] lg:h-[650px] object-cover"
          />

          {/* FLOATING CARDS */}
          <div className="absolute -bottom-6 left-4 lg:left-8 bg-white text-black p-4 lg:p-6 rounded-2xl shadow-2xl">
            <h3 className="font-bold text-base lg:text-xl">⭐ Top Rated Platform</h3>
            <p className="text-gray-500 mt-1 text-sm lg:text-base">
              Trusted by thousands of learners
            </p>
          </div>

          <div className="absolute top-4 lg:top-8 -left-2 lg:-left-6 bg-yellow-400 text-black px-4 py-3 lg:px-5 lg:py-4 rounded-2xl shadow-2xl font-bold text-sm lg:text-base">
            🎓 Certificate Included
          </div>

        </div>

      </div>

    </div>
  );
}

=======
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/courses?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 lg:py-24 px-4 lg:px-6">

        {/* LEFT SIDE */}
        <div className="relative z-10 text-center lg:text-left">

          <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20">
            🚀 100+ Premium Online Courses
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-tight mt-6 lg:mt-8">
            Learn Skills <br />
            Build Your <span className="text-yellow-300"> Dream Career</span>
          </h1>

          <p className="text-sm md:text-lg text-gray-100 mt-6 lg:mt-8 leading-7 lg:leading-9 max-w-2xl mx-auto lg:mx-0">
            Master coding, marketing, business, design, and more with expert instructors and real-world projects.
          </p>

          {/* SEARCH */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center mt-8 shadow-2xl max-w-2xl mx-auto lg:mx-0">

            <input
              type="text"
              placeholder="Search your favorite course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 sm:py-4 outline-none text-black rounded-xl"
            />

            <button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 sm:py-4 rounded-xl transition flex items-center justify-center gap-2 mt-2 sm:mt-0"
            >
              <FaSearch />
              Search
            </button>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

            <button
              onClick={() => navigate("/courses")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition"
            >
              Explore Courses
            </button>

            <button
              onClick={() => navigate("/about")}
              className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Learn More
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative mt-8 lg:mt-0">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Hero"
            className="rounded-3xl shadow-2xl w-full h-[350px] sm:h-[450px] lg:h-[650px] object-cover"
          />

          {/* FLOATING CARDS */}
          <div className="absolute -bottom-6 left-4 lg:left-8 bg-white text-black p-4 lg:p-6 rounded-2xl shadow-2xl">
            <h3 className="font-bold text-base lg:text-xl">⭐ Top Rated Platform</h3>
            <p className="text-gray-500 mt-1 text-sm lg:text-base">
              Trusted by thousands of learners
            </p>
          </div>

          <div className="absolute top-4 lg:top-8 -left-2 lg:-left-6 bg-yellow-400 text-black px-4 py-3 lg:px-5 lg:py-4 rounded-2xl shadow-2xl font-bold text-sm lg:text-base">
            🎓 Certificate Included
          </div>

        </div>

      </div>

    </div>
  );
}

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
export default Hero;