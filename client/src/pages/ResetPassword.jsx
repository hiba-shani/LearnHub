import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API}/api/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      setMessage(res.data.message || "Password reset successful ✅");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.log(err.response?.data || err.message);
      setMessage(
        err.response?.data?.message || "Reset failed ❌"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleReset}>

          <input
            type="email"
            placeholder="Enter email"
            className="border w-full p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            className="border w-full p-2 mb-3 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter new password"
            className="border w-full p-2 mb-3 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {message && (
          <p className="text-center mt-3 text-sm text-blue-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default ResetPassword;