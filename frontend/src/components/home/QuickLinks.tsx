import { FileText, Users, Building2, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  {
    icon: Building2,
    title: "Sarana Prasarana",
    desc: "Info & layanan peminjaman aset",
    to: "/biro/bauk",
    color: "bg-blue-500",
    hoverColor: "bg-blue-600",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Layanan SDM",
    desc: "Cuti, kenaikan pangkat, dll",
    to: "/biro/bauk",
    color: "bg-green-500",
    hoverColor: "bg-green-600",
    lightColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    icon: Wallet,
    title: "Keuangan",
    desc: "Informasi terkait pembayaran",
    to: "/biro/bauk",
    color: "bg-yellow-500",
    hoverColor: "bg-yellow-600",
    lightColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
  {
    icon: FileText,
    title: "Arsip Digital",
    desc: "Unduh SK dan dokumen resmi",
    to: "/dokumen",
    color: "bg-red-500",
    hoverColor: "bg-red-600",
    lightColor: "bg-red-100",
    textColor: "text-red-600",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
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
            <circle cx="10" cy="10" r="1" fill="#888888" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-700">
              LAYANAN KAMI
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Layanan Cepat
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Akses langsung ke informasi dan layanan yang paling sering dicari
            oleh civitas akademika
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Card Header with Icon */}
              <div
                className={`p-6 ${item.lightColor} flex justify-center items-center`}
              >
                <div
                  className={`p-5 rounded-full text-white ${item.color} group-hover:${item.hoverColor} transition-all duration-300 transform group-hover:scale-110 shadow-lg`}
                >
                  <item.icon size={32} />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3
                  className={`text-xl font-bold mb-3 ${item.textColor} group-hover:text-gray-900 transition-colors`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>

                {/* Card Footer */}
                <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  <span>Akses layanan</span>
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Butuh bantuan dengan layanan lainnya?
          </p>
          <Link
            to="/kontak"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
          >
            Hubungi Kami
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
