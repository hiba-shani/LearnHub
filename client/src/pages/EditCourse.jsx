import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditCourse() {

  const { id } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 

  // FETCH COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${API}/api/courses/${id}`
        );

        const course = res.data.course;

        setTitle(course.title || "");
        setShortDescription(course.shortDescription || "");
        setLongDescription(course.longDescription || "");
        setPrice(course.price || "");
        setCategory(course.category || "");
        setInstructorName(course.instructorName || "");

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error Fetching Data",
          text: "Could not load course details.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
      }
    };

    fetchCourse();
  }, [id, API]);

  // UPDATE COURSE
  const handleUpdate = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("instructorName", instructorName);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `${API}/api/courses/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

    
      Swal.fire({
        title: "Course Updated! ✅",
        text: "The course details have been updated successfully.",
        icon: "success",
        confirmButtonColor: "#10B981" // Green color
      }).then(() => {
        navigate("/instructor-dashboard");
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
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

     
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <textarea
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          placeholder="Long Description"
          rows="6"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          placeholder="Instructor Name"
          value={instructorName}
          onChange={(e) => setInstructorName(e.target.value)}
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-gray-600">Update Course Cover Image (Optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded transition mt-4"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}

export default EditCourse;