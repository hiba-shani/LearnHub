import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function CreateCourse() {

  const API = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("instructorName", instructorName);
      formData.append("price", Number(price));
      formData.append("category", category);

      if (image) formData.append("image", image);

      const res = await axios.post(
        `${API}/api/courses/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      
      Swal.fire({
        title: "Course Created! 🎉",
        text: "The new course has been added successfully.",
        icon: "success",
        confirmButtonColor: "#2563EB"
      });

      
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setInstructorName("");
      setPrice("");
      setCategory("");
      setImage(null);

     
      document.getElementById("course-image-input").value = "";

    } catch (error) {
      console.log(error);

     
      Swal.fire({
        title: "Error Creating Course",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444"
      });
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded-xl mt-10">

      <h1 className="text-2xl font-bold mb-6">
        Create Course
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <textarea
          placeholder="Short Description"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          onChange={(e) => setShortDescription(e.target.value)}
          value={shortDescription}
        />

        <textarea
          placeholder="Long Description"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="7"
          onChange={(e) => setLongDescription(e.target.value)}
          value={longDescription}
        />

        <input
          placeholder="Instructor Name"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setInstructorName(e.target.value)}
          value={instructorName}
        />

        <input
          placeholder="Price"
          type="number"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />

        <input
          placeholder="Category"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        />

      
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-gray-600">Course Cover Image:</label>
          <input
            id="course-image-input"
            type="file"
            accept="image/*"
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transition mt-4">
          Create Course
        </button>

      </form>

    </div>
  );
}

export default CreateCourse;