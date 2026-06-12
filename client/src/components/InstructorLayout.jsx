import { Outlet, useNavigate } from "react-router-dom";

function InstructorLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Instructor Panel</h1>
        <nav className="space-y-4">
          <a href="/instructor/dashboard" className="block p-2 hover:bg-slate-700 rounded">Dashboard</a>
          <a href="/instructor/create-course" className="block p-2 hover:bg-slate-700 rounded">Create Course</a>
          <button onClick={handleLogout} className="w-full text-left p-2 text-red-400">Logout</button>
        </nav>
      </div>
      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
export default InstructorLayout;