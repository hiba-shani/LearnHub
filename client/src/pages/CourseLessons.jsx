import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CourseLessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchLessons = async () => {
    const res = await axios.get(`${API}/api/courses/${courseId}/lessons`);
    setLessons(res.data.lessons);
  };

  const handleDelete = async (lessonId) => {
    const confirm = await Swal.fire({ title: "Delete Lesson?", icon: "warning", showCancelButton: true });
    if (confirm.isConfirmed) {
      await axios.delete(`${API}/api/lessons/${lessonId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchLessons(); 
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Course Lessons</h1>
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <span className="font-semibold">{lesson.title}</span>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/instructor/edit-lesson/${lesson._id}`)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
              <button onClick={() => handleDelete(lesson._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CourseLessons;