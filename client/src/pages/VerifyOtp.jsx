import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/verify-otp`,
        {
          email,
          otp: otp.toString(),
        }
      );

      alert(res.data.message);
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("OTP verification failed ❌");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
        `${API}/api/resend-otp`,
        { email }
      );

      alert(res.data.message);

    } catch (error) {
      console.log(error);
      alert("Failed to resend OTP ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 shadow rounded w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4">
          Verify OTP
        </h1>

        <form onSubmit={handleVerify} className="space-y-4">

          <input
            type="email"
            placeholder="Enter Email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Verify OTP
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            className="bg-gray-600 text-white px-4 py-2 rounded w-full"
          >
            Resend OTP
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyOtp;