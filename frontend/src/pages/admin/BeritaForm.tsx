import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
// Impor wrapper lazy-load kita
import LazyQuillEditor from "../../components/admin/LazyQuillEditor";

export default function BeritaForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Quill menyimpan HTML sebagai string
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection agar muncul preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Judul dan konten wajib diisi!");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("status", "published"); // Default langsung publish
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await api.post("/news", formData);

      alert("Berita berhasil diterbitkan!");
      navigate("/admin/berita");
    } catch (error) {
      console.error("Gagal upload berita:", error);
      alert("Terjadi kesalahan saat menyimpan berita.");
    } finally {
      setIsLoading(false);
    }
  };

  // Konfigurasi Toolbar Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header Form */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/admin/berita")}
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <ArrowLeft size={20} className="mr-1" /> Batal
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            Tulis Berita Baru
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm space-y-6"
        >
          {/* Input Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Berita
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Masukkan judul yang menarik..."
            />
          </div>

          {/* Input Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Utama (Thumbnail)
            </label>
            <div className="flex items-start space-x-4">
              <div className="w-40 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Rich Text Editor (Quill) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Isi Berita
            </label>
            <div className="h-96 pb-12">
              {/* Ganti ReactQuill MENJADI LazyQuillEditor */}
              <LazyQuillEditor
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className="h-full"
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end pt-6 border-t">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save size={20} className="mr-2" />
              {isLoading ? "Menyimpan..." : "Terbitkan Berita"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
