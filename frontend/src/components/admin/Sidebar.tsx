import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Images,
  FileText,
  Network,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/admin/dashboard" },
    { icon: Network, label: "Struktur Organisasi", to: "/admin/struktur" },
    { icon: Newspaper, label: "Berita", to: "/admin/berita" },
    { icon: Images, label: "Galeri", to: "/admin/galeri" },
    { icon: FileText, label: "Dokumen", to: "/admin/dokumen" },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-xl">
      {/* Header */}
      <div className="px-6 py-8 border-b border-blue-600">
        <h2 className="text-2xl font-bold text-center text-white flex items-center justify-center">
          <span className="bg-white text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">
            A
          </span>
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${
                  isActive
                    ? "bg-blue-800 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-600/50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-6 border-t border-blue-600">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-blue-100 transition-all duration-300 rounded-lg hover:bg-red-500/20 hover:text-white group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
