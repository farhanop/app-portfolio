import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import type { NewsItem } from "../../types/news";

export default function ManageBerita() {
  const queryClient = useQueryClient();

  // 1. Fetch Data Berita
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminNewsList"],
    queryFn: async () => {
      const res = await api.get("/news?limit=100"); // Ambil banyak dulu buat contoh
      return res.data[0] as NewsItem[];
    },
  });

  // 2. Mutasi Hapus Berita
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/news/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminNewsList"] });
      alert("Berita berhasil dihapus!");
    },
    onError: () => {
      alert("Gagal menghapus berita.");
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading data...</div>
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <div>Error memuat data.</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Berita</h2>
        <Link
          to="/admin/berita/tambah"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" /> Tambah Berita
        </Link>
      </div>

      {/* Tabel Sederhana */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penulis
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {item.slug}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.author?.fullName || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  {/* Tombol Lihat */}
                  <Link
                    to={`/berita/${item.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-blue-600"
                    title="Lihat"
                  >
                    <Eye size={18} className="inline" />
                  </Link>

                  {/* Tombol Edit */}
                  <Link
                    to={`/admin/berita/edit/${item.id}`} // Link ke halaman edit admin
                    className="text-yellow-600 hover:text-yellow-900 transition"
                    title="Edit"
                  >
                    <Edit size={18} className="inline" />
                  </Link>

                  {/* Tombol Hapus */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Hapus"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={18} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada berita.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
