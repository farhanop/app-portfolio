import { Quote, BookOpen, Users, Award } from "lucide-react";

export default function WelcomeMessage() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
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
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
            <Quote className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              SAMBUTAN PIMPINAN
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Kata Sambutan</h2>
          <p className="text-gray-600 mt-2">
            Dari Wakil Rektor II Universitas Indo Global Mandiri
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Photo and Stats */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            <div className="relative mb-8">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl transform rotate-6 -z-10"></div>
              <div className="absolute -inset-2 bg-white rounded-xl transform -rotate-3 -z-20"></div>

              {/* Main Image */}
              <img
                src="https://placehold.co/300x400/e2e8f0/1e293b?text=FOTO+WAREK+2"
                alt="Wakil Rektor II"
                className="rounded-2xl shadow-xl object-cover w-64 h-80 md:w-72 md:h-96 relative z-10 border-4 border-white"
              />

              {/* Decorative Badge */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-20">
                Wakil Rektor II
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                <BookOpen className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-500">Pengalaman</p>
                <p className="font-bold">15+ Tahun</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                <Users className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-xs text-gray-500">Tim</p>
                <p className="font-bold">50+ Orang</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                <Award className="w-6 h-6 mx-auto text-yellow-600 mb-2" />
                <p className="text-xs text-gray-500">Penghargaan</p>
                <p className="font-bold">10+</p>
              </div>
            </div>
          </div>

          {/* Right: Welcome Message */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-6">
                <h4 className="text-blue-600 font-semibold mb-2 uppercase tracking-wider flex items-center">
                  <Quote className="w-5 h-5 mr-2" />
                  Sambutan Wakil Rektor II
                </h4>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Selamat Datang di Website Resmi Kami
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                <p className="text-lg font-medium text-gray-800">
                  Assalamu'alaikum Warahmatullahi Wabarakatuh,
                </p>

                <p>
                  Puji syukur kita panjatkan ke hadirat Allah SWT. Website ini
                  hadir sebagai wujud komitmen kami dalam memberikan pelayanan
                  yang prima, transparan, dan mudah diakses oleh seluruh civitas
                  akademika UIGM.
                </p>

                <p>
                  Bidang II terus berupaya meningkatkan kualitas tata kelola
                  administrasi, keuangan yang akuntabel, serta pengembangan SDM
                  yang kompeten untuk mendukung visi UIGM menjadi universitas
                  unggul.
                </p>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 my-6">
                  <p className="text-blue-800 font-medium">
                    "Melalui website ini, kami berkomitmen untuk menyediakan
                    informasi yang akurat, transparan, dan mudah diakses oleh
                    seluruh civitas akademika."
                  </p>
                </div>

                <p>
                  Kami harap website ini dapat menjadi sarana interaksi yang
                  efektif antara universitas dengan seluruh stakeholder, serta
                  mendukung terwujudnya tata kelola yang baik dan bersih.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-900 text-lg">
                  Dr. Nama Pejabat, S.E., M.Si.
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-normal text-gray-500">
                    Wakil Rektor II UIGM
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm font-normal text-gray-500">
                    Periode 2021-2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
