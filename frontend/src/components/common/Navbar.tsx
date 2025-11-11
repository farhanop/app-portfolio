import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Beranda", to: "/" },
    { label: "Profil", to: "/profil" },
    { label: "Struktur", to: "/struktur" },
    { label: "Berita", to: "/berita" },
    { label: "Galeri", to: "/galeri" },
    { label: "Dokumen", to: "/dokumen" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Nama Kampus */}
          <Link to="/" className="flex items-center space-x-2">
            {/* Ganti src dengan logo kampus Anda nanti */}
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
              UIGM
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900 leading-tight">
                Wakil Rektor II
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">
                Bid. Administrasi Umum, Keuangan & SDM
              </p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-800 font-bold"
                      : "text-gray-600 hover:text-blue-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Tombol Hamburger Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile (Dropdown) */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)} // Tutup menu saat diklik
                  className={({ isActive }) =>
                    `block px-2 py-1 text-base font-medium rounded-md ${
                      isActive
                        ? "text-blue-900 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-2 py-2 text-base font-medium text-center text-white bg-blue-900 rounded-md hover:bg-blue-800"
              >
                Login Staff
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
