import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
  window.location.reload();
};

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50 relative">

      
      <h1 className="text-2xl font-bold text-blue-600">
        LearnHub
      </h1>

      
      <div className="space-x-6 hidden md:block">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/courses" className="hover:text-blue-500">Courses</Link>
        <Link to="/my-courses">My Courses</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>

        <Link to="/contact" className="hover:text-indigo-600 transition">
          Contact
        </Link>

        {user && (user.role === "admin" || user.role === "instructor") && (
          <Link to="/create-course" className="hover:text-blue-500">
            Create Course
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin-dashboard" className="text-red-600 font-bold">
            Admin Dashboard
          </Link>
        )}

        {user?.role === "instructor" && (
          <Link to="/instructor-dashboard" className="hover:text-blue-500">
            Instructor Dashboard
          </Link>
        )}
      </div>

     
     <div className="space-x-4 hidden md:flex">
  {user ? (
    <> <span className="font-semibold">
    Hi, {user.name}
  </span>
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white rounded-full bg-red-600 hover:bg-red-700"
    >
      Logout
    </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="px-4 py-2 border text-white rounded-full bg-indigo-600 hover:bg-indigo-700"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-4 py-2 text-white rounded-full bg-indigo-600 hover:bg-indigo-700"
      >
        Register
      </Link>
    </>
  )}
</div>

     
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* mobile view */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-5 md:hidden z-50">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/courses">Courses</Link>
          <Link onClick={() => setOpen(false)} to="/my-courses">My Courses</Link>
          <Link onClick={() => setOpen(false)} to="/about">About</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>

          {user && (user.role === "admin" || user.role === "instructor") && (
            <Link onClick={() => setOpen(false)} to="/create-course">
              Create Course
            </Link>
          )}

          {user?.role === "admin" && (
            <Link onClick={() => setOpen(false)} to="/admin-dashboard" className="text-red-600 font-bold">
              Admin Dashboard
            </Link>
          )}

          {user?.role === "instructor" && (
            <Link onClick={() => setOpen(false)} to="/instructor-dashboard">
              Instructor Dashboard
            </Link>
          )}

          <hr />

         {user ? (
          <> <span className="font-semibold">
    Hi, {user.name}
  </span>
  <button
    onClick={() => {
      handleLogout();
      setOpen(false);
    }}
    className="text-red-600 text-left"
  >
    Logout
  </button>
  </>
) : (
  <>
    <Link onClick={() => setOpen(false)} to="/login">
      Login
    </Link>

    <Link onClick={() => setOpen(false)} to="/register">
      Register
    </Link>
  </>
)}

        </div>
      )}

    </div>
  );
}

export default Navbar;