import { useQuery } from "@tanstack/react-query";
import { Download, FileText, Calendar } from "lucide-react";
import PublicLayout from "../../components/layouts/PublicLayout";
import api from "../../services/api";
import type { DocumentItem, DocCategory } from "../../types/document";

// Helper dari ManageDokumen (bisa dipindah ke file utils)
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const CATEGORY_LABELS: Record<DocCategory, string> = {
  sk_rektor: "SK Rektor",
  surat_edaran: "Surat Edaran",
  pengumuman_mhs: "Pengumuman Mhs",
  lainnya: "Lainnya",
};

export default function DokumenPage() {
  // 1. Fetch Data Dokumen
  const { data, isLoading, error } = useQuery({
    queryKey: ["publicDocs"],
    queryFn: async () => {
      const res = await api.get<DocumentItem[]>("/documents");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <PublicLayout>
        <div className="text-center py-20">Memuat dokumen...</div>
      </PublicLayout>
    );
  if (error)
    return (
      <PublicLayout>
        <div className="text-center py-20 text-red-500">Gagal memuat data.</div>
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <div className="bg-blue-900 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Arsip Dokumen</h1>
        <p className="mt-2 text-blue-100">
          Unduh dokumen resmi, SK, dan pengumuman.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {data?.map((doc) => (
              <li
                key={doc.id}
                className="p-4 md:p-6 hover:bg-gray-50 transition flex items-center space-x-4"
              >
                <FileText className="h-10 w-10 text-blue-500 flex-shrink-0" />

                <div className="flex-grow">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1 ${
                      doc.category === "sk_rektor"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {CATEGORY_LABELS[doc.category] || doc.category}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900">
                    {doc.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                    <span>{formatFileSize(doc.fileSize)}</span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(doc.uploadedAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>

                <a
                  href={`http://localhost:5000/uploads/documents/${doc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 ml-4 px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Unduh
                </a>
              </li>
            ))}
          </ul>

          {data?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Belum ada dokumen yang dipublikasikan.
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
