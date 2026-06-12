
import { Outlet, NavLink, useNavigate } from "react-router-dom";

function InstructorLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Instructor Panel</h1>
        
        <nav className="space-y-4">
          <NavLink to="/instructor/dashboard" className={({ isActive }) => isActive ? "bg-slate-700 p-2 block rounded" : "p-2 block"}>
            Dashboard
          </NavLink>
          <NavLink to="/my-courses" className={({ isActive }) => isActive ? "bg-slate-700 p-2 block rounded" : "p-2 block"}>
            My Courses
          </NavLink>
          <NavLink to="/instructor/create-course" className={({ isActive }) => isActive ? "bg-slate-700 p-2 block rounded" : "p-2 block"}>
            Create Course
          </NavLink>
        </nav>

        <button onClick={handleLogout} className="mt-10 w-full text-left p-2 text-red-400">
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
export default InstructorLayout;