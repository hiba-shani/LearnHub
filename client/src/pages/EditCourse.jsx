import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    category: "",
    instructorName: ""
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API}/api/courses/${id}`);
        const course = res.data.course;
        setFormData({
          title: course.title || "",
          shortDescription: course.shortDescription || "",
          longDescription: course.longDescription || "",
          price: course.price || "",
          category: course.category || "",
          instructorName: course.instructorName || ""
        });
        setCurrentImage(course.image || "");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Could not load course details.", "error");
      }
    };
    fetchCourse();
  }, [id, API]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      await axios.put(`${API}/api/courses/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      Swal.fire("Success!", "Course updated successfully.", "success").then(() => {
        navigate("/my-courses");
      });
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire("Error", "Update failed.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        
        {/* Title */}
        <div>
          <input name="title" value={formData.title} onChange={handleChange} className={`border p-3 w-full rounded ${errors.title ? "border-red-500" : ""}`} placeholder="Course Title" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Descriptions */}
        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="border p-3 w-full rounded" placeholder="Short Description" />
        <textarea name="longDescription" value={formData.longDescription} onChange={handleChange} rows="5" className="border p-3 w-full rounded" placeholder="Long Description" />

        {/* Price & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input name="price" type="number" value={formData.price} onChange={handleChange} className={`border p-3 w-full rounded ${errors.price ? "border-red-500" : ""}`} placeholder="Price" />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <input name="category" value={formData.category} onChange={handleChange} className="border p-3 w-full rounded" placeholder="Category" />
        </div>

        {/* Image Handling */}
        {/* Image Handling */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-600">Current Cover:</label>
  {currentImage && (
    <img 
      src={currentImage.startsWith('http') ? currentImage : `${API}/uploads/${currentImage}`} 
      alt="Course" 
      className="w-32 h-20 object-cover rounded shadow" 
    />
  )}
  <input 
    type="file" 
    accept="image/*" 
    onChange={(e) => setImage(e.target.files[0])} 
    className="text-sm border p-2 w-full rounded" 
  />
</div>
        <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition mt-4">
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}

export default EditCourse;