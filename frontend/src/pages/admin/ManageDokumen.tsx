import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, FileText, Download } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import type { DocumentItem, DocCategory } from "../../types/document";
import { Link } from "react-router-dom";

// Helper untuk format ukuran file
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Helper untuk label kategori yang cantik
const CATEGORY_LABELS: Record<DocCategory, string> = {
  sk_rektor: "SK Rektor",
  surat_edaran: "Surat Edaran",
  pengumuman_mhs: "Pengumuman Mhs",
  lainnya: "Lainnya",
};

export default function ManageDokumen() {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminDocs"],
    queryFn: async () => {
      const res = await api.get<DocumentItem[]>("/documents");
      return res.data;
    },
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/documents/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDocs"] });
    },
    onError: () => alert("Gagal menghapus dokumen."),
  });

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus dokumen ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading...</div>
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
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Dokumen</h2>
        <Link
          to="/admin/dokumen/tambah"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" /> Upload Dokumen
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Dokumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ukuran / Tanggal
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="text-blue-500 mr-3" size={24} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {doc.title}
                      </div>
                      {doc.description && (
                        <div className="text-xs text-gray-500">
                          {doc.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {CATEGORY_LABELS[doc.category] || doc.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{formatFileSize(doc.fileSize)}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(doc.uploadedAt).toLocaleDateString("id-ID")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <a
                    href={`http://localhost:5000/uploads/documents/${doc.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 inline-block"
                    title="Download/Lihat"
                  >
                    <Download size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Hapus"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada dokumen.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
