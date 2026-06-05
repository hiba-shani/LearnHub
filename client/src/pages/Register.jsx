import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // ✅ VITE API BASE URL
  const API = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all fields before registering.",
        icon: "warning",
        confirmButtonColor: "#16A34A" // Green-600
      });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await axios.post(`${API}/api/register`, {
        name,
        email,
        password,
        role,
      });

      
      Swal.fire({
        title: "OTP Sent! 📩",
        text: "A one-time password has been sent to your email address. Please verify.",
        icon: "success",
        confirmButtonColor: "#16A34A"
      }).then(() => {
        navigate("/verify-otp", {
          state: { email },
        });
      });

    } catch (err) {
      console.log(err);
      
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
       
        Swal.fire({
          title: "Registration Failed",
          text: err.response?.data?.message || "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Name"
              className={`border w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`border w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`border w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <select
              className="border border-gray-300 p-3 w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-xl font-bold text-lg transition mt-2 shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;