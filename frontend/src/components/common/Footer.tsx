import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="20" height="20" fill="white" />
            <circle cx="10" cy="10" r="1" fill="#ffffff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Kolom 1: Logo & Info Kampus */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold">WR</span>
              </div>
              <h3 className="text-white text-xl font-bold">Wakil Rektor II</h3>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Universitas Indo Global Mandiri (UIGM) Palembang. Berkomitmen pada
              pelayanan administrasi, keuangan, dan pengembangan SDM yang
              unggul.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Link Cepat */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
              Tautan Penting
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Website Utama UIGM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Sistem Akademik
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  E-Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Portal Mahasiswa
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
              Layanan Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Administrasi Umum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Keuangan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Pengembangan SDM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-500 group-hover:text-white" />
                  Sarana Prasarana
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Jl. Jend. Sudirman No.629, Palembang 30129</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                <span>info@uigm.ac.id</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                <span>(0711) 362766</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                <span>Senin - Jumat (08.00 - 16.00)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Wakil Rektor II UIGM. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Peta Situs
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
