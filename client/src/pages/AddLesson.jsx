import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; 

function CreateLesson() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [pdf, setPdf] = useState(null);
  const [errors, setErrors] = useState({}); 

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    const formData = new FormData();
    formData.append("title", title);
    formData.append("videoUrl", videoUrl);
    formData.append("notes", notes);
    if (pdf) formData.append("pdf", pdf);

    try {
      await axios.post(
        `${API}/api/courses/${id}/lessons`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );

      Swal.fire({
        title: "Lesson Added! 🎉",
        text: "The new lesson has been added successfully.",
        icon: "success",
        confirmButtonColor: "#2563EB",
      });

      setTitle("");
      setVideoUrl("");
      setNotes("");
      setPdf(null);
      document.getElementById("pdf-file-input").value = "";

    } catch (error) {
      // backend validation
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      }
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white p-6 shadow rounded w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Add Lesson</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Lesson Title"
              className={`border p-2 w-full rounded focus:outline-none ${errors.title ? "border-red-500" : "border-gray-300"}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Video URL"
              className={`border p-2 w-full rounded focus:outline-none ${errors.videoUrl ? "border-red-500" : "border-gray-300"}`}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            {errors.videoUrl && <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>}
          </div>

          <textarea
            placeholder="Lesson Notes"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-600">Upload PDF Notes (Optional):</label>
            <input
              id="pdf-file-input"
              type="file"
              accept=".pdf"
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setPdf(e.target.files[0])}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transition">
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateLesson;