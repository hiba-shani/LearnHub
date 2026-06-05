import { useNavigate } from "react-router-dom"; 
import { FaStar, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

function CourseCard({ course }) {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); 

  
  const handleViewCourse = () => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      
      Swal.fire({
        title: "Access Denied!",
        text: "Please login or register first to view this course.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4F46E5", 
        cancelButtonColor: "#EF4444", 
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      
      navigate(`/course/${course._id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1">

      {/* COURSE IMAGE */}
      <img
        src={
          course.image
            ? `${API}/uploads/${course.image}`
            : "https://via.placeholder.com/400x250"
        }
        alt={course.title}
        className="w-full h-52 object-cover"
      />

      {/* CONTENT */}
      <div className="p-5">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
          {course.category}
        </span>

        <h2 className="text-lg font-bold mt-4 line-clamp-2 min-h-[56px]">
          {course.title}
        </h2>

        <p className="text-sm text-gray-500">
          By {course.instructorName}
        </p>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 text-sm font-semibold">4.8</span>
          </div>
          <span className="text-gray-400 text-sm">(120 Reviews)</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <FaUsers />
          <span>1.2k Students</span>
        </div>

        <div className="flex items-center justify-between mt-5">
          <p className="text-2xl font-bold text-indigo-600">
            ₹{course.price}
          </p>
👈 
          
          <button 
            onClick={handleViewCourse}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;