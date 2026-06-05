import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const API = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const res = await axios.post(
        `${API}/api/forgot-password`,
        { email }
      );

      setMessage(res.data.message || "OTP sent to email ✅");

      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);

    } catch (err) {

      console.log(err.response?.data || err.message);

      setMessage(
        err.response?.data?.message ||
        "Something went wrong ❌"
      );

    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            className="border w-full p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

        {message && (
          <p className="text-center mt-3 text-sm text-green-600">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default ForgotPassword;