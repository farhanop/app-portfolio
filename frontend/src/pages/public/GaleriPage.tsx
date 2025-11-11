import { useQuery } from "@tanstack/react-query";
import { Image as ImageIcon, Calendar } from "lucide-react";
import PublicLayout from "../../components/layouts/PublicLayout";
import api from "../../services/api";
import type { GalleryItem } from "../../types/gallery"; // Kita pakai tipe data yang sudah ada

export default function GaleriPage() {
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["publicGalleries"],
    queryFn: async () => {
      const res = await api.get<GalleryItem[]>("/galleries");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <PublicLayout>
        <div className="text-center py-20">Memuat galeri...</div>
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <div className="bg-blue-900 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Galeri Kegiatan</h1>
        <p className="mt-2 text-blue-100">
          Dokumentasi foto kegiatan di lingkungan Warek II.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleries?.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-gray-100 group"
            >
              {/* Cover Album */}
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                {album.coverImagePath ? (
                  <img
                    src={`http://localhost:5000/uploads/gallery/${album.coverImagePath}`}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs font-bold rounded">
                  {album.images?.length || 0} Foto
                </div>
              </div>

              {/* Info Album */}
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar size={14} className="mr-1.5" />
                  {new Date(album.createdAt).toLocaleDateString("id-ID")}
                </div>
                <h2
                  className="text-xl font-bold text-gray-900 leading-snug truncate group-hover:text-blue-600"
                  title={album.title}
                >
                  {album.title}
                </h2>
                {album.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {album.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {galleries?.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Belum ada galeri kegiatan yang dipublikasikan.
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
