import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  IndianRupee
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {

  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />
    },
    {
      name: "Instructors",
      path: "/admin/instructors",
      icon: <GraduationCap size={20} />
    },
    {
      name: "Courses",
      path: "/admin/courses",
      icon: <BookOpen size={20} />
    },
    {
      name: "Revenue",
      path: "/admin/revenue",
      icon: <IndianRupee size={20} />
    }
  ];

  return (
    <div
      className="
      w-64
      min-h-screen
      bg-slate-900
      text-white
      p-5
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        Admin Panel
      </h1>

      <div className="space-y-2">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            to={menu.path}
            className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition

              ${
                location.pathname === menu.path
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            {menu.icon}
            {menu.name}
          </Link>

        ))}

      </div>

    </div>
  );
}

export default AdminSidebar;