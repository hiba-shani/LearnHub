<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
      }

    };

    fetchCourse();

  }, [id, API]);

  // UPDATE COURSE
  const handleUpdate = async () => {

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

      alert("Course Updated Successfully ✅");
      navigate("/instructor-dashboard");

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Update failed ❌"
      );
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Course
      </h1>

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <textarea
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <textarea
        placeholder="Long Description"
        rows="6"
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="text"
        placeholder="Instructor Name"
        value={instructorName}
        onChange={(e) => setInstructorName(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-3 w-full mb-4 rounded"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        Update Course
      </button>

    </div>
  );
}

=======
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
      }

    };

    fetchCourse();

  }, [id, API]);

  // UPDATE COURSE
  const handleUpdate = async () => {

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

      alert("Course Updated Successfully ✅");
      navigate("/instructor-dashboard");

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Update failed ❌"
      );
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Course
      </h1>

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <textarea
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <textarea
        placeholder="Long Description"
        rows="6"
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="text"
        placeholder="Instructor Name"
        value={instructorName}
        onChange={(e) => setInstructorName(e.target.value)}
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-3 w-full mb-4 rounded"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        Update Course
      </button>

    </div>
  );
}

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
export default EditCourse;