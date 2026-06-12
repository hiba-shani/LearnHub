import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  IndianRupee,
  LogOut
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Instructors", path: "/admin/instructors", icon: <GraduationCap size={20} /> },
    { name: "Courses", path: "/admin/courses", icon: <BookOpen size={20} /> },
    { name: "Revenue", path: "/admin/revenue", icon: <IndianRupee size={20} /> }
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <div className="space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === menu.path
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }`}
            >
              {menu.icon}
              {menu.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition text-white mt-auto"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;