import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function EditLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({ title: "", videoUrl: "", notes: "" });
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`${API}/api/courses/lesson/${lessonId}`);
        const lesson = res.data.lesson;
        setFormData({
          title: lesson.title || "",
          videoUrl: lesson.videoUrl || "",
          notes: lesson.notes || ""
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Could not load lesson details.", "error");
      }
    };
    fetchLesson();
  }, [lessonId, API]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (pdf) data.append("pdf", pdf);

    try {
      await axios.put(`${API}/api/courses/lesson/${lessonId}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      Swal.fire("Success", "Lesson updated successfully!", "success").then(() => navigate(-1));
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire("Update Failed", error.response?.data?.message || "Something went wrong.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Lesson</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        
        <div>
          <input name="title" placeholder="Lesson Title" value={formData.title} onChange={handleChange} className={`border p-3 w-full rounded ${errors.title ? "border-red-500" : ""}`} />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <input name="videoUrl" placeholder="Video URL" value={formData.videoUrl} onChange={handleChange} className={`border p-3 w-full rounded ${errors.videoUrl ? "border-red-500" : ""}`} />
          {errors.videoUrl && <p className="text-red-500 text-xs mt-1">{errors.videoUrl}</p>}
        </div>

        <textarea name="notes" rows="6" placeholder="Lesson Notes" value={formData.notes} onChange={handleChange} className="border p-3 w-full rounded" />

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-gray-600">Update PDF Notes (Optional):</label>
          <input type="file" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} className="text-sm border p-2 w-full rounded" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition mt-4">
          {loading ? "Updating..." : "Update Lesson"}
        </button>
      </form>
    </div>
  );
}

export default EditLesson;