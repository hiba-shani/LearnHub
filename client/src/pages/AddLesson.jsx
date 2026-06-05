import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateLesson() {

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [pdf, setPdf] = useState(null);

  const token = localStorage.getItem("token");

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert("Lesson added 🎉");

      setTitle("");
      setVideoUrl("");
      setNotes("");
      setPdf(null);

    } catch (error) {
      console.log(error);
      alert("Error adding lesson ❌");
    }
  };

  return (
    <div className="p-8 flex justify-center">

      <div className="bg-white p-6 shadow rounded w-full max-w-lg">

        <h1 className="text-2xl font-bold mb-4">
          Add Lesson
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Lesson Title"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Video URL"
            className="border p-2 w-full"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <textarea
            placeholder="Lesson Notes"
            className="border p-2 w-full"
            rows="5"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* PDF Upload */}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdf(e.target.files[0])}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Lesson
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateLesson;