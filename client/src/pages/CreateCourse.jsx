import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function CreateCourse() {
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    instructorName: "",
    price: "",
    category: ""
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({}); 

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      await axios.post(`${API}/api/courses/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      Swal.fire("Course Created! 🎉", "The course has been added successfully.", "success");
      
      setFormData({ title: "", shortDescription: "", longDescription: "", instructorName: "", price: "", category: "" });
      setImage(null);
      document.getElementById("course-image-input").value = "";
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire("Error", error.response?.data?.message || "Something went wrong.", "error");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <input name="title" placeholder="Title" className={`border p-2 w-full rounded ${errors.title ? "border-red-500" : ""}`} onChange={handleChange} value={formData.title} />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div>
          <textarea name="shortDescription" placeholder="Short Description" className={`border p-2 w-full rounded ${errors.shortDescription ? "border-red-500" : ""}`} onChange={handleChange} value={formData.shortDescription} />
          {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription}</p>}
        </div>

        {/* Long Description */}
        <div>
          <textarea name="longDescription" placeholder="Long Description" className={`border p-2 w-full rounded ${errors.longDescription ? "border-red-500" : ""}`} rows="5" onChange={handleChange} value={formData.longDescription} />
          {errors.longDescription && <p className="text-red-500 text-xs mt-1">{errors.longDescription}</p>}
        </div>

        {/* Price */}
        <div>
          <input name="price" type="number" placeholder="Price" className={`border p-2 w-full rounded ${errors.price ? "border-red-500" : ""}`} onChange={handleChange} value={formData.price} />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* Category */}
        <div>
          <input name="category" placeholder="Category" className={`border p-2 w-full rounded ${errors.category ? "border-red-500" : ""}`} onChange={handleChange} value={formData.category} />
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        {/* Instructor Name */}
        <input name="instructorName" placeholder="Instructor Name" className="border p-2 w-full rounded" onChange={handleChange} value={formData.instructorName} />

        {/* Image */}
        <div className="flex flex-col space-y-1">
          <input id="course-image-input" type="file" accept="image/*" className="text-sm" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition mt-4">
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;