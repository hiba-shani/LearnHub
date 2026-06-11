import { Outlet, NavLink } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive
                  ? "bg-indigo-500"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive
                  ? "bg-indigo-500"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            User Management
          </NavLink>

          <NavLink
            to="/admin/instructors"
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive
                  ? "bg-indigo-500"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Instructor Management
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive
                  ? "bg-indigo-500"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Course Management
          </NavLink>

          <NavLink
            to="/admin/revenue"
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive
                  ? "bg-indigo-500"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Revenue Management
          </NavLink>

        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;