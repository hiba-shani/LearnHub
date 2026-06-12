import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    setLoading(true);
    setErrors({});

    try {
      await axios.post(`${API}/api/register`, formData);
      
      Swal.fire({
        title: "OTP Sent! 📩",
        text: "Please verify your email.",
        icon: "success",
        confirmButtonColor: "#16A34A"
      }).then(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      });

    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        Swal.fire("Registration Failed", err.response?.data?.message || "Something went wrong.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Register</h2>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <input name="name" type="text" placeholder="Name" className={`border w-full p-3 rounded-xl outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`} value={formData.name} onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <input name="email" type="email" placeholder="Email" className={`border w-full p-3 rounded-xl outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`} value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <input name="password" type="password" placeholder="Password" className={`border w-full p-3 rounded-xl outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`} value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          {/* ROLE */}
          <select name="role" className="border p-3 w-full rounded-xl" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <button onClick={handleRegister} disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition">
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;