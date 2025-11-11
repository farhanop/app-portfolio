import PublicLayout from "../../components/layouts/PublicLayout";

interface BiroPageProps {
  type: "BAUK" | "BPT";
}

// Data sementara sampai API profil biro siap
const BIRO_DATA = {
  BAUK: {
    title: "Biro Administrasi Umum & Keuangan",
    subtitle:
      "Mewujudkan tata kelola administrasi dan keuangan yang transparan dan akuntabel.",
    tupoksi: [
      "Pelaksanaan urusan ketatausahaan, kerumahtanggaan, dan perlengkapan.",
      "Pelaksanaan urusan hukum dan tata laksana.",
      "Pengelolaan keuangan universitas (SPP, Anggaran Operasional).",
      "Manajemen aset dan inventaris kampus.",
    ],
    layanan: [
      "E-Aset",
      "Sistem Pengajuan Anggaran",
      "Layanan Peminjaman Ruangan",
    ],
  },
  BPT: {
    title: "Biro Pelaksana Teknis",
    subtitle:
      "Dukungan teknis infrastruktur IT dan laboratorium untuk menunjang pembelajaran unggul.",
    tupoksi: [
      "Pengelolaan infrastruktur jaringan internet kampus.",
      "Pemeliharaan hardware dan software laboratorium komputer.",
      "Dukungan teknis sistem informasi akademik.",
      "Pengembangan teknologi pembelajaran.",
    ],
    layanan: ["Helpdesk IT", "E-Learning Support", "Peminjaman Alat Lab"],
  },
};

export default function BiroPage({ type }: BiroPageProps) {
  const data = BIRO_DATA[type];

  return (
    <PublicLayout>
      {/* Hero Section Biro */}
      <div
        className={`py-20 text-white ${
          type === "BAUK" ? "bg-blue-800" : "bg-teal-800"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Kolom Kiri: Tupoksi */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tugas Pokok & Fungsi
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <ul className="space-y-4">
                {data.tupoksi.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-4 ${
                        type === "BAUK" ? "bg-blue-600" : "bg-teal-600"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Area untuk Struktur Organisasi Internal Biro (Nanti bisa pakai OrgTree yang difilter) */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
              Struktur Internal
            </h2>
            <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center text-gray-500">
              (Bagan Struktur {type} akan muncul di sini)
            </div>
          </div>

          {/* Kolom Kanan: Layanan & Quick Links */}
          <div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Layanan {type}
              </h3>
              <ul className="space-y-3">
                {data.layanan.map((layanan, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:text-blue-600 transition border border-gray-100 font-medium text-gray-700"
                    >
                      🔗 {layanan}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
