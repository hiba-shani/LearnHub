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
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Instructors", path: "/admin/instructors" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Revenue", path: "/admin/revenue" }
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8 px-4">Admin Panel</h1>

        <div className="space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`block px-4 py-3 rounded-xl transition ${
                location.pathname === menu.path
                  ? "bg-indigo-600 font-semibold"
                  : "hover:bg-slate-800"
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-600 transition text-white font-semibold mt-auto"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;