import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    try {
      setLoading(true);
      setErrors({});

      await axios.post(`${API}/api/register`, {
        name,
        email,
        password,
        role,
      });

      alert("OTP sent to your email 📩");

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(
          err.response?.data?.message || "Register failed ❌"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-6 shadow-lg rounded w-80">

        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          className={`border w-full mb-1 p-2 ${
            errors.name ? "border-red-500" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">
            {errors.name}
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className={`border w-full mb-1 p-2 ${
            errors.email ? "border-red-500" : ""
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {errors.email}
          </p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className={`border w-full mb-1 p-2 ${
            errors.password ? "border-red-500" : ""
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password}
          </p>
        )}

        {/* ROLE */}
        <select
          className="border p-2 w-full mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>
    </div>
  );
}

export default Register;