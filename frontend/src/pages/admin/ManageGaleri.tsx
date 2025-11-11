import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Trash2, Image as ImageIcon, Calendar, Edit } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import type { GalleryItem } from "../../types/gallery"; // Pastikan Anda sudah buat file ini

export default function ManageGaleri() {
  const queryClient = useQueryClient();

  // 1. Fetch Data Album
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["adminGalleries"],
    queryFn: async () => {
      const res = await api.get<GalleryItem[]>("/galleries");
      return res.data;
    },
  });

  // 2. Mutasi Hapus Album
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/galleries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminGalleries"] });
      alert("Album berhasil dihapus");
    },
    onError: () => alert("Gagal menghapus album."),
  });

  if (isLoading) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Galeri</h2>
        <Link
          to="/admin/galeri/tambah"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" /> Buat Album Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleries?.map((album) => (
          <div
            key={album.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group"
          >
            {/* Cover Album */}
            <div className="relative h-48 bg-gray-100">
              {album.coverImagePath ? (
                <img
                  src={`http://localhost:5000/uploads/gallery/${album.coverImagePath}`}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ImageIcon size={48} />
                </div>
              )}
            </div>

            {/* Info Album */}
            <div className="p-4">
              <h3
                className="font-bold text-gray-900 truncate mb-1"
                title={album.title}
              >
                {album.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={14} className="mr-1" />
                {new Date(album.createdAt).toLocaleDateString("id-ID")}
                <span className="mx-2">•</span>
                {album.images?.length || 0} Foto
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex border-t border-gray-100">
              <Link
                to={`/admin/galeri/edit/${album.id}`}
                className="flex-1 flex items-center justify-center px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm("Hapus album ini beserta semua fotonya?")) {
                    deleteMutation.mutate(album.id);
                  }
                }}
                disabled={deleteMutation.isPending}
                className="flex-1 flex items-center justify-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-l border-gray-100"
              >
                <Trash2 size={16} className="mr-2" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {galleries?.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p>Belum ada album galeri.</p>
          <Link
            to="/admin/galeri/tambah"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Buat album pertama Anda
          </Link>
        </div>
      )}
    </AdminLayout>
  );
}
