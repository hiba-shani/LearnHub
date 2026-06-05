import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditLesson() {

  const { lessonId } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [pdf, setPdf] = useState(null);

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
      }

    };

    fetchLesson();

  }, [lessonId, API]);

  // UPDATE LESSON
  const handleUpdate = async () => {

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

      alert("Lesson Updated ✅");
      navigate(-1);

    } catch (error) {
      console.log(error);
      alert("Update failed ❌");
    }

  };

  return (
    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Lesson
      </h1>

      <input
        type="text"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <textarea
        rows="6"
        placeholder="Lesson Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="file"
        onChange={(e) => setPdf(e.target.files[0])}
        className="border p-3 w-full mb-4 rounded"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        Update Lesson
      </button>

    </div>
  );
}

export default EditLesson;