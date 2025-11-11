// frontend/src/pages/public/BeritaDetail.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Tag,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import api from "../../services/api";
import type { NewsItem } from "../../types/news";
import PublicLayout from "../../components/layouts/PublicLayout";

export default function BeritaDetail() {
  const { slug } = useParams();

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newsDetail", slug],
    queryFn: async () => {
      const res = await api.get<NewsItem>(`/news/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  if (isLoading)
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Memuat artikel...</p>
        </div>
      </PublicLayout>
    );

  if (error || !news)
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Berita tidak ditemukan
          </h3>
          <p className="text-gray-600 mb-6">
            Artikel yang Anda cari mungkin telah dihapus atau tidak tersedia.
          </p>
          <Link
            to="/berita"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Kembali ke Daftar Berita
          </Link>
        </div>
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/berita"
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft size={18} className="mr-2" /> Kembali ke Daftar Berita
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          {/* Category Badge */}
          {news.category && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Tag size={14} className="mr-1" />
              {news.category.name}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {news.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
            <span className="flex items-center">
              <Calendar size={18} className="mr-2 text-blue-600" />
              {new Date(news.createdAt).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            {news.author && (
              <span className="flex items-center">
                <User size={18} className="mr-2 text-blue-600" />
                {news.author.fullName}
              </span>
            )}

            <span className="flex items-center">
              <Clock size={18} className="mr-2 text-blue-600" />
              {Math.ceil(news.content.length / 200)} menit baca
            </span>
          </div>

          {/* Social Sharing */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Bagikan:</span>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Heart size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <MessageCircle size={18} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {news.thumbnailPath && (
          <div className="mb-10">
            <img
              src={`http://localhost:5000/uploads/news-thumbs/${news.thumbnailPath}`}
              alt={news.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg"
            />
            {news.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center italic">
                {news.caption}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10">
          <div
            className="prose prose-lg max-w-none prose-blue prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-4"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Tag Terkait
            </h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related News (Placeholder) */}
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Berita Terkait
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for related news */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Berita Terkait {item}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Deskripsi singkat berita terkait...
                  </p>
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    <span>10 Mei 2023</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
