import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import api from "../../services/api";
import PublicLayout from "../../components/layouts/PublicLayout";

export default function BeritaList() {
  // Fetch data berita dari API
  const { data, isLoading, error } = useQuery({
    queryKey: ["newsList"],
    queryFn: async () => {
      // Backend kita mengembalikan [items[], total] untuk findAndCount
      // Jadi kita perlu sesuaikan parsing-nya sedikit
      const res = await api.get("/news");
      return {
        items: res.data[0], // Array berita
        total: res.data[1], // Jumlah total
      };
    },
  });

  if (isLoading)
    return (
      <PublicLayout>
        <div className="text-center py-20">Memuat berita...</div>
      </PublicLayout>
    );
  if (error)
    return (
      <PublicLayout>
        <div className="text-center py-20 text-red-500">
          Gagal memuat berita.
        </div>
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <div className="bg-blue-900 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Berita & Artikel</h1>
        <p className="mt-2 text-blue-100">
          Kabar terbaru dari lingkungan Wakil Rektor II
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-gray-100 flex flex-col"
            >
              {/* Thumbnail */}
              <Link
                to={`/berita/${item.slug}`}
                className="h-48 overflow-hidden bg-gray-200"
              >
                {item.thumbnailPath ? (
                  <img
                    src={`http://localhost:5000/uploads/news-thumbs/${item.thumbnailPath}`}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  {item.author && (
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {item.author.fullName}
                    </span>
                  )}
                </div>

                <Link to={`/berita/${item.slug}`} className="block mb-3">
                  <h2 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 hover:text-blue-600">
                    {item.title}
                  </h2>
                </Link>

                {/* Cuplikan isi berita (hilangkan tag HTML) */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {item.content.replace(/<[^>]+>/g, "")}
                </p>

                <Link
                  to={`/berita/${item.slug}`}
                  className="text-blue-600 font-medium hover:underline mt-auto inline-block"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {data?.items.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            Belum ada berita yang dipublikasikan.
          </p>
        )}
      </div>
    </PublicLayout>
  );
}
