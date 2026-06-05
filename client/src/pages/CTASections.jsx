
import {  useNavigate } from "react-router-dom";

function CTASection() {
    const navigate=useNavigate()

  return (

    <div
      className="
      bg-gradient-to-r
      from-indigo-600
      to-purple-600
      py-20
      px-6
      text-white
      "
    >

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-5xl font-bold leading-tight">

          Start Learning Today

        </h1>

        <p className="text-xl mt-6 text-gray-100">

          Join thousands of students and upgrade your skills
          with premium online courses.

        </p>

        <button onClick={()=>navigate("/courses")}
          className="
          mt-10
          bg-white
          text-indigo-600
          px-10
          py-4
          rounded-xl
          font-semibold
          hover:scale-105
          transition
          "
        >
          Explore Courses
        </button>

      </div>

    </div>

  );

}


export default CTASection;