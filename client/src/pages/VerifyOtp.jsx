import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  
  
  const [errors, setErrors] = useState({}); 

  const API = import.meta.env.VITE_API_URL;

  
  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null 
      });
    }
  };

  // ✅ VERIFY OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    setErrors({}); 

    if (!email.trim() || !otp.trim()) {
      Swal.fire({
        title: "Fields Required",
        text: "Please enter both email and OTP.",
        icon: "warning",
        confirmButtonColor: "#2563EB"
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${API}/api/verify-otp`,
        {
          email,
          otp: otp.toString(),
        }
      );

      Swal.fire({
        title: "Verification Successful! 🎉",
        text: res.data.message || "Your account has been verified successfully.",
        icon: "success",
        confirmButtonColor: "#2563EB"
      }).then(() => {
        navigate("/login");
      });

    } catch (error) {
      console.log(error);
      
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
       
        Swal.fire({
          title: "Verification Failed",
          text: error.response?.data?.message || "Invalid OTP. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
        
        
        setErrors({ otp: error.response?.data?.message || "Invalid OTP" });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResendOtp = async () => {
    if (!email.trim()) {
      setErrors({ email: "Email is required to resend OTP" });
      Swal.fire({
        title: "Email Missing",
        text: "Please enter your email to resend OTP.",
        icon: "warning",
        confirmButtonColor: "#4B5563"
      });
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/resend-otp`,
        { email }
      );

      Swal.fire({
        title: "OTP Resent! 📩",
        text: res.data.message || "A new OTP has been sent to your email.",
        icon: "info",
        confirmButtonColor: "#4B5563"
      });

    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire({
          title: "Failed to Resend",
          text: error.response?.data?.message || "Could not resend OTP.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Verify OTP
        </h1>

        <form onSubmit={handleVerify} className="space-y-4">
          
          {/* EMAIL INPUT WITH RED LINE ERROR */}
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              className={`border p-3 w-full rounded-xl outline-none focus:ring-2 transition ${
                errors.email 
                  ? "border-red-500 focus:ring-red-500 bg-red-50" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={email}
             
              onChange={(e) => handleInputChange("email", e.target.value, setEmail)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* OTP INPUT WITH RED LINE ERROR */}
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              className={`border p-3 w-full rounded-xl outline-none focus:ring-2 transition tracking-widest text-center font-bold text-lg ${
                errors.otp 
                  ? "border-red-500 focus:ring-red-500 bg-red-50" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={otp}
              // 👈 ഇവിടെ handleInputChange ഉപയോഗിച്ചു
              onChange={(e) => handleInputChange("otp", e.target.value, setOtp)}
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1 text-center font-medium">
                {errors.otp}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl w-full transition shadow-md mt-2"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl w-full transition shadow-sm"
          >
            Resend OTP
          </button>
        </form>

      </div>
    </div>
  );
}

export default VerifyOtp;