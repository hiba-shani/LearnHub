import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Lessons() {
  const { id } = useParams();

  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ BASE URL (VITE + DEPLOY SAFE)
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchLessons();
    fetchProgress();
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

      await fetchProgress();
      alert("Lesson Completed ✅");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    }
  };

  // SUBMIT REVIEW
  const submitReview = async () => {
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

      alert("Review Added ⭐");
      setComment("");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Review Failed");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Course Lessons
      </h1>

      {/* PROGRESS */}
      {progress && (
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-semibold">
              Course Progress
            </h2>
            <p className="font-bold">
              {progress.percentage}%
            </p>
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
          <p>Loading...</p>
        ) : lessons?.length > 0 ? (
          lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >

              <h2 className="text-2xl font-bold mb-4">
                {lesson.title}
              </h2>

              <div className="mb-6">
                <iframe
                  width="100%"
                  height="450"
                  src={
                    lesson.videoUrl?.includes("watch?v=")
                      ? lesson.videoUrl.replace(
                          "watch?v=",
                          "embed/"
                        )
                      : lesson.videoUrl
                  }
                  title="Lesson Video"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">
                  Lesson Notes
                </h3>
                <p className="text-gray-700 leading-8">
                  {lesson.notes}
                </p>
              </div>

              {lesson.pdf && (
                <a
                  href={`${API}/uploads/${lesson.pdf}`}
                  download
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl mb-6"
                >
                  Download PDF 📄
                </a>
              )}

              <button
                onClick={() => markComplete(lesson._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Mark as Complete ✅
              </button>

            </div>
          ))
        ) : (
          <p>No lessons found</p>
        )}
      </div>

      {/* COMPLETION SECTION */}
      {progress?.percentage === 100 && (
        <div className="bg-white p-8 rounded-2xl shadow-xl mt-14">

          <h2 className="text-3xl font-bold mb-6">
            🎉 Course Completed
          </h2>

          <button
            onClick={() => navigate(`/certificate/${id}`)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl mb-10"
          >
            Download Certificate 📜
          </button>

          <h3 className="text-2xl font-bold mb-4">
            Add Your Review
          </h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-3 rounded-xl w-full mb-4"
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-4 rounded-xl w-full mb-4"
          />

          <button
            onClick={submitReview}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl"
          >
            Submit Review ⭐
          </button>

        </div>
      )}

    </div>
  );
}

export default Lessons;