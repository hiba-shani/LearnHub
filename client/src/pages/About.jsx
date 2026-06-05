
import {
  FaBookOpen,
  FaCertificate,
  FaUsers,
  FaLaptopCode,
  FaStar
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate=useNavigate();

  return (

    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}

      <div
        className="
        bg-gradient-to-r
        from-indigo-600
        via-purple-600
        to-pink-500
        text-white
        py-24
        px-6
        "
      >

        <motion.div

          initial={{ opacity: 0, y: 50 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8 }}

          className="
          max-w-6xl
          mx-auto
          text-center
          "
        >

          <h1
            className="
            text-5xl
            md:text-6xl
            font-bold
            mb-6
            "
          >
            About LearnHub
          </h1>

          <p
            className="
            text-xl
            text-gray-100
            max-w-3xl
            mx-auto
            leading-9
            "
          >
            LearnHub is a modern online learning platform
            helping students improve their skills through
            high-quality courses, projects, certificates,
            and expert mentorship.
          </p>

        </motion.div>

      </div>

      {/* FEATURES */}

      <div className="max-w-6xl mx-auto py-20 px-6">

        <motion.h2

          initial={{ opacity: 0 }}

          whileInView={{ opacity: 1 }}

          transition={{ duration: 1 }}

          className="
          text-4xl
          font-bold
          text-center
          mb-14
          "
        >
          Why Choose LearnHub?
        </motion.h2>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
          "
        >

          {/* CARD */}

          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="
            bg-white
            p-6
            rounded-2xl
            shadow-lg
            text-center
            "
          >

            <FaBookOpen
              className="
              text-5xl
              text-blue-600
              mx-auto
              mb-4
              "
            />

            <h3 className="text-xl font-bold mb-3">
              Premium Courses
            </h3>

            <p className="text-gray-600">
              Learn from structured and practical courses.
            </p>

          </motion.div>

          {/* CARD */}

          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="
            bg-white
            p-6
            rounded-2xl
            shadow-lg
            text-center
            "
          >

            <FaCertificate
              className="
              text-5xl
              text-green-600
              mx-auto
              mb-4
              "
            />

            <h3 className="text-xl font-bold mb-3">
              Certificates
            </h3>

            <p className="text-gray-600">
              Earn certificates after completing courses.
            </p>

          </motion.div>

          {/* CARD */}

          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="
            bg-white
            p-6
            rounded-2xl
            shadow-lg
            text-center
            "
          >

            <FaUsers
              className="
              text-5xl
              text-pink-600
              mx-auto
              mb-4
              "
            />

            <h3 className="text-xl font-bold mb-3">
              Community
            </h3>

            <p className="text-gray-600">
              Learn together with students worldwide.
            </p>

          </motion.div>

          {/* CARD */}

          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="
            bg-white
            p-6
            rounded-2xl
            shadow-lg
            text-center
            "
          >

            <FaLaptopCode
              className="
              text-5xl
              text-purple-600
              mx-auto
              mb-4
              "
            />

            <h3 className="text-xl font-bold mb-3">
              Practical Projects
            </h3>

            <p className="text-gray-600">
              Build real-world projects and gain experience.
            </p>

          </motion.div>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
        bg-white
        py-20
        "
      >

        <div
          className="
          max-w-6xl
          mx-auto
          grid
          md:grid-cols-4
          gap-8
          text-center
          px-6
          "
        >

          <div>

            <h1
              className="
              text-5xl
              font-bold
              text-blue-600
              "
            >
              10K+
            </h1>

            <p className="text-gray-600 mt-3">
              Students
            </p>

          </div>

          <div>

            <h1
              className="
              text-5xl
              font-bold
              text-green-600
              "
            >
              150+
            </h1>

            <p className="text-gray-600 mt-3">
              Courses
            </p>

          </div>

          <div>

            <h1
              className="
              text-5xl
              font-bold
              text-pink-600
              "
            >
              50+
            </h1>

            <p className="text-gray-600 mt-3">
              Mentors
            </p>

          </div>

          <div>

            <h1
              className="
              text-5xl
              font-bold
              text-yellow-500
              "
            >
              4.9
            </h1>

            <p className="text-gray-600 mt-3">
              Rating
            </p>

          </div>

        </div>

      </div>

      {/* CERTIFICATE SECTION */}

      <div
        className="
        max-w-6xl
        mx-auto
        py-20
        px-6
        "
      >

        <div
          className="
          grid
          md:grid-cols-2
          gap-12
          items-center
          "
        >

          <motion.div

            initial={{ opacity: 0, x: -50 }}

            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.8 }}

          >

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Certificate"
              className="
              rounded-3xl
              shadow-2xl
              "
            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0, x: 50 }}

            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.8 }}

          >

            <h2
              className="
              text-4xl
              font-bold
              mb-6
              "
            >
              Earn Verified Certificates
            </h2>

            <p
              className="
              text-gray-600
              text-lg
              leading-8
              "
            >
              Complete courses successfully and receive
              professional certificates to showcase your
              skills and achievements.
            </p>

            <button onClick={()=>navigate("/courses")}
              className="
              mt-8
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              py-4
              rounded-xl
              transition
              "
              
            >
              Start Learning
            </button>

          </motion.div>

        </div>

      </div>

      {/* TESTIMONIAL */}

      <div
        className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        py-20
        px-6
        text-white
        "
      >

        <div
          className="
          max-w-4xl
          mx-auto
          text-center
          "
        >

          <FaStar
            className="
            text-yellow-300
            text-5xl
            mx-auto
            mb-6
            "
          />

          <h2
            className="
            text-3xl
            font-bold
            mb-6
            "
          >
            Trusted by Thousands of Students
          </h2>

          <p
            className="
            text-xl
            leading-9
            text-gray-100
            "
          >
            LearnHub helped thousands of students improve
            their skills, build careers, and achieve their
            learning goals through practical education.
          </p>

        </div>

      </div>

    </div>

  );

}


export default About;