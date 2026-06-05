import { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; 

function Lessons() {
  const { id } = useParams();

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchLessons();
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // FETCH LESSONS
  const fetchLessons = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/courses/${id}/lessons`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLessons(res.data.lessons || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH PROGRESS
  const fetchProgress = async () => {
    try {
      const res = await axios.get(
        `${API}/api/courses/${id}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProgress(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // MARK COMPLETE
  const markComplete = async (lessonId) => {
    try {
      await axios.post(
        `${API}/api/courses/${id}/progress`,
        { lessonId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      const res = await axios.get(`${API}/api/courses/${id}/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProgress(res.data);

      
      if (res.data.percentage === 100) {
        Swal.fire({
          title: "Congratulations! 🎉",
          text: "You have completed 100% of the course lessons!",
          icon: "success",
          backdrop: `rgba(0,0,123,0.4) url("https://media.giphy.com/media/26fCRIhoYf1vtCo6k/giphy.gif") center center no-repeat`, // കോൺഫെറ്റി ജിഫ് ബാക്ക്ഗ്രൗണ്ട്
          confirmButtonColor: "#7C3AED" // Purple button
        });
      } else {
       
        Swal.fire({
          title: "Lesson Completed! ✅",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Action Failed",
        text: error.response?.data?.message || "Failed to mark lesson as complete.",
        icon: "error",
        confirmButtonColor: "#EF4444"
      });
    }
  };

  // SUBMIT REVIEW
  const submitReview = async () => {
    if (!comment.trim()) {
      Swal.fire({
        title: "Review Empty",
        text: "Please write a comment before submitting.",
        icon: "warning",
        confirmButtonColor: "#EAB308"
      });
      return;
    }

    try {
      await axios.post(
        `${API}/api/courses/${id}/review`,
        {
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Review Added! ⭐",
        text: "Thank you for your valuable feedback.",
        icon: "success",
        confirmButtonColor: "#EAB308" // Yellow-500
      });

      setComment("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Review Failed",
        text: error.response?.data?.message || "Could not submit review.",
        icon: "error",
        confirmButtonColor: "#EF4444"
      });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Course Lessons</h1>

      {/* PROGRESS */}
      {progress && (
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-semibold">Course Progress</h2>
            <p className="font-bold">{progress.percentage}%</p>
          </div>

          <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden">
            <div
              className="bg-green-500 h-5 transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* LESSONS */}
      <div className="space-y-8">
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : lessons?.length > 0 ? (
          lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

              <div className="mb-6">
                <iframe
                  width="100%"
                  height="450"
                  src={
                    lesson.videoUrl?.includes("watch?v=")
                      ? lesson.videoUrl.replace("watch?v=", "embed/")
                      : lesson.videoUrl
                  }
                  title="Lesson Video"
                  allowFullScreen
                  className="rounded-xl border shadow-inner"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Lesson Notes</h3>
                <p className="text-gray-700 leading-8 whitespace-pre-line">
                  {lesson.notes}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {lesson.pdf && (
                  <a
                    href={`${API}/uploads/${lesson.pdf}`}
                    download
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
                  >
                    Download PDF 📄
                  </a>
                )}

                <button
                  onClick={() => markComplete(lesson._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition font-semibold"
                >
                  Mark as Complete ✅
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">No lessons found for this course.</p>
        )}
      </div>

      {/* COMPLETION SECTION */}
      {progress?.percentage === 100 && (
        <div className="bg-white p-8 rounded-2xl shadow-xl mt-14 border-t-4 border-purple-500">
          <h2 className="text-3xl font-bold mb-6 text-purple-700">🎉 Course Completed</h2>

          <button
            onClick={() => navigate(`/certificate/${id}`)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl mb-10 transition font-bold text-lg shadow-md"
          >
            Download Certificate 📜
          </button>

          <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-3 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
            <option value="4">⭐⭐⭐⭐ (Very Good)</option>
            <option value="3">⭐⭐⭐ (Good)</option>
            <option value="2">⭐⭐ (Fair)</option>
            <option value="1">⭐ (Poor)</option>
          </select>

          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-4 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="4"
          />

          <button
            onClick={submitReview}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl transition font-bold shadow-md"
          >
            Submit Review ⭐
          </button>
        </div>
      )}
    </div>
  );
}

export default Lessons;