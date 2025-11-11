import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock, Tag, User } from "lucide-react";

// Data dummy sementara sebelum API siap
const DUMMY_NEWS = [
  {
    id: 1,
    title: "UIGM Raih Penghargaan Tata Kelola Keuangan Terbaik",
    date: "10 Nov 2025",
    img: "https://placehold.co/400x250/e2e8f0/1e293b?text=News+1",
    slug: "berita-1",
    category: "Penghargaan",
    author: "Admin",
    readTime: "3 min",
  },
  {
    id: 2,
    title: "Sosialisasi Sistem Penggajian Baru Tahun 2025",
    date: "05 Nov 2025",
    img: "https://placehold.co/400x250/e2e8f0/1e293b?text=News+2",
    slug: "berita-2",
    category: "Keuangan",
    author: "Admin",
    readTime: "5 min",
  },
  {
    id: 3,
    title: "Peresmian Laboratorium Komputer Baru Gedung C",
    date: "01 Nov 2025",
    img: "https://placehold.co/400x250/e2e8f0/1e293b?text=News+3",
    slug: "berita-3",
    category: "Fasilitas",
    author: "Admin",
    readTime: "4 min",
  },
];

export default function LatestNews() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-blue-700">
                BERITA TERKINI
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Berita Terbaru
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Kabar terkini dari lingkungan Wakil Rektor II UIGM
            </p>
          </div>
          <Link
            to="/berita"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm group"
          >
            Lihat Semua Berita
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Image Container */}
              <div className="relative">
                <Link
                  to={`/berita/${item.slug}`}
                  className="block h-48 overflow-hidden"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </Link>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-3">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {item.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {item.readTime}
                  </span>
                  <span className="flex items-center">
                    <User size={14} className="mr-1" />
                    {item.author}
                  </span>
                </div>

                {/* Title */}
                <Link to={`/berita/${item.slug}`} className="block mb-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>

                {/* Read More Link */}
                <Link
                  to={`/berita/${item.slug}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA Button */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
            <Tag className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              MENARIK? BACA JUGA
            </span>
          </div>
          <Link
            to="/berita"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md md:hidden"
          >
            Lihat Semua Berita <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
