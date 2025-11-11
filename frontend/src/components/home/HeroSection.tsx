import { Link } from "react-router-dom";
import { ArrowRight, Building, Users, FileText, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
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
            <circle cx="10" cy="10" r="1" fill="#003366" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left: Content */}
          <div className="w-full md:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">
                Website Resmi Universitas
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Profesional, <span className="text-yellow-300">Transparan</span>,
              & Akuntabel
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Website resmi Wakil Rektor II Bidang Administrasi Umum, Keuangan,
              dan SDM Universitas Indo Global Mandiri. Pusat informasi dan
              layanan terintegrasi untuk civitas akademika.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                <Building className="w-8 h-8 mb-2 text-yellow-300" />
                <span className="text-sm font-medium">Infrastruktur</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                <Users className="w-8 h-8 mb-2 text-yellow-300" />
                <span className="text-sm font-medium">SDM</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                <FileText className="w-8 h-8 mb-2 text-yellow-300" />
                <span className="text-sm font-medium">Dokumen</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/profil"
                className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
              >
                Tentang Kami <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/dokumen"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center"
              >
                Unduh Dokumen
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://placehold.co/600x400/003366/FFF?text=FOTO+KAMPUS"
                  alt="Gedung UIGM"
                  className="w-full h-auto transform transition duration-700 hover:scale-105"
                />
              </div>

              {/* Decorative Card */}
              <div className="absolute -bottom-6 -left-6 w-4/5 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 z-0">
                <div className="flex items-center">
                  <div className="mr-4 p-3 bg-yellow-400 rounded-lg">
                    <Building className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Kampus Modern</h3>
                    <p className="text-sm text-blue-100">
                      Fasilitas terbaik untuk mahasiswa
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-full shadow-lg z-20">
                #1 di Indonesia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-16 md:h-24"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,90.7C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
