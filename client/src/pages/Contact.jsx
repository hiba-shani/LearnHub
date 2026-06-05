import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane
} from "react-icons/fa";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 

function Contact() {

  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/contact/send`,
        formData
      );

    
      Swal.fire({
        title: "Message Sent! 🚀",
        text: res.data.message || "Thank you for contacting us. We will get back to you soon.",
        icon: "success",
        confirmButtonColor: "#4F46E5"
      });

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.log(error);

      
      Swal.fire({
        title: "Submission Failed",
        text: error.response?.data?.message || "Failed to send message. Please try again later.",
        icon: "error",
        confirmButtonColor: "#EF4444"
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

        {/* LEFT */}
        <div className="bg-indigo-600 text-white rounded-3xl p-10 shadow-2xl">

          <h1 className="text-5xl font-bold mb-10">
            Contact Us
          </h1>

          <p className="text-lg leading-8 text-indigo-100 mb-12">
            Have questions about courses or enrollment? Reach out to us.
          </p>

          <div className="space-y-8">

            <div className="flex gap-5">
              <FaEnvelope className="text-2xl" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p>support@learnhub.com</p>
              </div>
            </div>

            <div className="flex gap-5">
              <FaPhoneAlt className="text-2xl" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="flex gap-5">
              <FaMapMarkerAlt className="text-2xl" />
              <div>
                <h3 className="font-bold">Location</h3>
                <p>Calicut, Kerala</p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold mb-10">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold flex justify-center items-center gap-3 transition"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;