
import { useState } from "react";
import axios from "axios";

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
      alert("Course created 🎉");

      // optional reset
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setInstructorName("");
      setPrice("");
      setCategory("");
      setImage(null);

    } catch (error) {
      console.log(error);
      alert("Error creating course ❌");
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-4">
        Create Course
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Title"
          className="border p-2 w-full"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <textarea
          placeholder="Short Description"
          className="border p-2 w-full"
          rows="3"
          onChange={(e) => setShortDescription(e.target.value)}
          value={shortDescription}
        />

        <textarea
          placeholder="Long Description"
          className="border p-2 w-full"
          rows="7"
          onChange={(e) => setLongDescription(e.target.value)}
          value={longDescription}
        />

        <input
          placeholder="Instructor Name"
          className="border p-2 w-full"
          onChange={(e) => setInstructorName(e.target.value)}
          value={instructorName}
        />

        <input
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />

        <input
          placeholder="Category"
          className="border p-2 w-full"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>

      </form>

    </div>
  );
}


export default CreateCourse;