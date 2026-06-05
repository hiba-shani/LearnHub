import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function EditLesson() {

  const { lessonId } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false); 

  // FETCH LESSON
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(
          `${API}/api/courses/lesson/${lessonId}`
        );

        const lesson = res.data.lesson;

        setTitle(lesson.title || "");
        setVideoUrl(lesson.videoUrl || "");
        setNotes(lesson.notes || "");

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error Fetching Data",
          text: "Could not load lesson details.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
      }
    };

    fetchLesson();
  }, [lessonId, API]);

  // UPDATE LESSON
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("videoUrl", videoUrl);
      formData.append("notes", notes);

      if (pdf) {
        formData.append("pdf", pdf);
      }

      await axios.put(
        `${API}/api/courses/lesson/${lessonId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      
      Swal.fire({
        title: "Lesson Updated! ✅",
        text: "The lesson details have been updated successfully.",
        icon: "success",
        confirmButtonColor: "#10B981" // Green color
      }).then(() => {
        navigate(-1);
      });

    } catch (error) {
      console.log(error);
      
     
      Swal.fire({
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Lesson</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          rows="6"
          placeholder="Lesson Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-gray-600">Update PDF Notes (Optional):</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded transition mt-4"
        >
          {loading ? "Updating..." : "Update Lesson"}
        </button>
      </form>
    </div>
  );
}

export default EditLesson;