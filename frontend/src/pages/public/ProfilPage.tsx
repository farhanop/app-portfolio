import PublicLayout from "../../components/layouts/PublicLayout";
import WelcomeMessage from "../../components/home/WelcomeMessage";
import { CheckCircle } from "lucide-react";

const VisiMisi = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Visi */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 italic leading-relaxed">
              "Menjadi unit pendukung yang profesional dalam tata kelola
              administrasi, keuangan, dan SDM untuk mewujudkan Visi Universitas
              Indo Global Mandiri."
            </p>
          </div>
        </div>
        {/* Misi */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi</h2>
          <ul className="space-y-4">
            {[
              "Menyelenggarakan pelayanan administrasi yang cepat, tepat, dan modern.",
              "Mengelola keuangan secara transparan, akuntabel, dan efisien.",
              "Mengembangkan sumber daya manusia (SDM) yang kompeten dan berintegritas.",
              "Memelihara dan mengoptimalkan sarana prasarana kampus.",
            ].map((misi, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{misi}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default function ProfilPage() {
  return (
    <PublicLayout>
      {/* Kita panggil ulang komponen sambutan di sini */}
      <WelcomeMessage />
      {/* Kita tambahkan seksi Visi Misi di bawahnya */}
      <VisiMisi />
    </PublicLayout>
  );
}
