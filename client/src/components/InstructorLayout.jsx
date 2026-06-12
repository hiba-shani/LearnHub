import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookPlus, BookOpen, LogOut } from "lucide-react";

function InstructorLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  
  const activeClass = "block p-3 bg-slate-800 rounded-lg flex items-center gap-3";
  const inactiveClass = "block p-3 hover:bg-slate-800 rounded-lg flex items-center gap-3 transition";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Instructor Panel</h1>
        
        <nav className="space-y-2">
          <NavLink to="/instructor/dashboard" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink to="/my-courses" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            <BookOpen size={20} /> My Courses
          </NavLink>

          <NavLink to="/instructor/create-course" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            <BookPlus size={20} /> Create Course
          </NavLink>
        </nav>

        <div className="mt-10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default InstructorLayout;