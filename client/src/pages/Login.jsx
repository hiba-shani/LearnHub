<<<<<<< HEAD
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      if (err.response?.data?.errors) {
        const validationErrors = {};

        Object.keys(err.response.data.errors).forEach((key) => {
          validationErrors[key] = err.response.data.errors[key];
        });

        setErrors(validationErrors);

      } else {
        alert(
          err.response?.data?.message || "Login failed ❌"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            className={`w-full border p-2 mb-1 rounded ${errors.email ? "border-red-500" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            className={`w-full border p-2 mb-1 rounded ${errors.password ? "border-red-500" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password}
            </p>
          )}

          {/* Forgot Password */}
          <div className="text-right mb-3">
            <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

=======
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      if (err.response?.data?.errors) {
        const validationErrors = {};

        Object.keys(err.response.data.errors).forEach((key) => {
          validationErrors[key] = err.response.data.errors[key];
        });

        setErrors(validationErrors);

      } else {
        alert(
          err.response?.data?.message || "Login failed ❌"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            className={`w-full border p-2 mb-1 rounded ${errors.email ? "border-red-500" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            className={`w-full border p-2 mb-1 rounded ${errors.password ? "border-red-500" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password}
            </p>
          )}

          {/* Forgot Password */}
          <div className="text-right mb-3">
            <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
export default Login;