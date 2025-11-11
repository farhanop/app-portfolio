import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../context/AuthContext";
import {
  Newspaper,
  Images,
  FileText,
  Users,
  //ChartBar,
  Activity,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  // Data statistik (contoh)
  const stats = [
    {
      title: "Total Berita",
      value: "24",
      icon: Newspaper,
      change: "+12%",
      changeType: "positive",
      color: "blue",
    },
    {
      title: "Galeri",
      value: "18",
      icon: Images,
      change: "+5%",
      changeType: "positive",
      color: "purple",
    },
    {
      title: "Dokumen",
      value: "32",
      icon: FileText,
      change: "+8%",
      changeType: "positive",
      color: "green",
    },
    {
      title: "Pengguna",
      value: "8",
      icon: Users,
      change: "0%",
      changeType: "neutral",
      color: "yellow",
    },
  ];

  // Data aktivitas terkini (contoh)
  const recentActivities = [
    { user: "Admin", action: "menambah berita baru", time: "2 jam yang lalu" },
    { user: "Editor", action: "memperbarui galeri", time: "4 jam yang lalu" },
    { user: "Admin", action: "mengupload dokumen", time: "1 hari yang lalu" },
  ];

  return (
    <AdminLayout>
      {/* Header Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Selamat datang kembali di panel administrasi
        </p>
      </div>

      {/* Welcome Card */}
      <div className="mb-8 overflow-hidden bg-white rounded-xl shadow-md">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center">
            <div className="p-3 mr-4 bg-white/20 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Selamat Datang, {user?.username}!
              </h2>
              <p className="text-blue-100">
                Anda login sebagai{" "}
                <span className="font-bold">{user?.role}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600">
            Gunakan menu di sidebar sebelah kiri untuk mengelola konten website.
            Anda dapat melihat statistik terkini dan aktivitas terbaru di bawah
            ini.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div
                  className={`p-3 mr-4 bg-${stat.color}-100 rounded-full text-${stat.color}-600`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.changeType === "positive" && (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  )}
                  {stat.change} dari bulan lalu
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Aktivitas Terkini
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Lihat semua
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="p-2 mr-3 bg-gray-100 rounded-full">
                  <Activity className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-800">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Statistik Cepat
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  Pengunjung Hari Ini
                </span>
                <span className="text-sm font-medium text-gray-800">124</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  Halaman Dilihat
                </span>
                <span className="text-sm font-medium text-gray-800">312</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  Waktu Rata-rata
                </span>
                <span className="text-sm font-medium text-gray-800">3:24</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
