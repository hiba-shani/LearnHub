import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa"; 
import Swal from "sweetalert2"; 

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`${API}/api/courses/${id}`);
      const courseData = res.data.course;

      // CHECK PURCHASED
      if (token) {
        const userCourses = await axios.get(`${API}/api/courses/my-courses`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const purchased = userCourses.data.courses.some((c) => c._id === id);
        courseData.isPurchased = purchased;
      }

      setCourse(courseData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/api/courses/${id}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  const handlePayment = async () => {
    console.log("TOKEN=", token);
    console.log("KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    console.log("WINDOW RZP:", window.Razorpay);
    
    try {
      const res = await axios.post(
        `${API}/api/payment/create-order`,
        { amount: course.price },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Backend Order Response:", res.data);
   
      const orderData = res.data.order ? res.data.order : res.data;

      
      let finalAmount = orderData.amount;
      if (finalAmount < 1000) { 
        finalAmount = finalAmount * 100;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Number(finalAmount),      
        currency: orderData.currency  || "INR", 
        order_id: orderData.id,       
        name: "LearnHub",
        description: course.title,
        handler: async function (response) { 
          try {
            await axios.post(
              `${API}/api/courses/${id}/enroll`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            
            Swal.fire({
              title: "Payment Successful! 🎉",
              text: "You have been successfully enrolled in this course.",
              icon: "success",
              confirmButtonColor: "#4F46E5",
              confirmButtonText: "Go to Lessons"
            }).then(() => {
              navigate(`/lessons/${id}`);
            });

          } catch (enrollError) {
            console.log(enrollError);
            Swal.fire({
              title: "Enrollment Failed",
              text: "Payment received, but enrollment failed. Contact support.",
              icon: "error",
              confirmButtonColor: "#EF4444"
            });
          }
        },
        prefill: {
          name: user?.name || "Test User",
          email: user?.email || "test@example.com",
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      
    
      Swal.fire({
        title: "Payment Cancelled/Failed",
        text: error.response?.data?.message || "Could not complete the transaction. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
        confirmButtonText: "Close"
      });
    }
  };

  if (!course) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-14 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        {/* IMAGE */}
        <div>
          <img
            src={
              course.image
                ? `${API}/uploads/${course.image}`
                : "https://via.placeholder.com/400x250"
            }
            alt={course.title}
            className="w-full max-h-[650px] object-cover rounded-3xl shadow-2xl sticky top-24"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <span className="bg-indigo-100 text-indigo-600 px-5 py-2 rounded-full text-sm font-semibold">
            {course.category}
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">{course.title}</h1>

          <p className="text-gray-600 mt-6 text-lg leading-8">
            {course.shortDescription}
          </p>

          {/* INSTRUCTOR */}
          <div className="flex items-center gap-4 mt-8">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
              {course.instructorName?.charAt(0)}
            </div>

            <div>
              <p className="text-gray-500 text-sm">Instructor</p>
              <h3 className="font-bold text-lg">{course.instructorName}</h3>
            </div>
          </div>

          {/* PRICE */}
          <h2 className="text-6xl font-extrabold text-indigo-600 mt-12">
            ₹{course.price}
          </h2>

          {/* BUTTON */}
          {course.isPurchased || user?.role === "admin" ? (
            <button
              onClick={() => navigate(`/lessons/${id}`)}
              className="mt-12 w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-xl font-bold transition"
            >
              Go To Lessons
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="mt-12 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl text-xl font-bold transition"
            >
              Buy Now
            </button>
          )}
        </div>

        {/* REVIEWS */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Student Reviews</h2>

          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border rounded-2xl p-5 mb-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{review.rating}/5</span>
                </div>
                <h4 className="font-bold">{review.userName}</h4>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;