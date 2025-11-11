import { useState, useEffect } from "react"; // Pastikan 'useEffect' di-import
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  //Image as ImageIcon,
  Loader2,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import type { GalleryItem } from "../../types/gallery";

export default function EditGaleri() {
  const { id } = useParams();
  //const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // 1. Fetch Data Album (HAPUS 'onSuccess' DARI SINI)
  const { data: album, isLoading: isLoadingAlbum } = useQuery({
    queryKey: ["adminGalleryDetail", id],
    queryFn: async () => {
      const res = await api.get<GalleryItem>(`/galleries/${id}`);
      return res.data;
    },
    enabled: !!id,
    // onSuccess: (data) => { ... } <-- INI DIHAPUS DARI v5
  });

  // 2. (PERBAIKAN) Pindahkan logika 'onSuccess' ke 'useEffect'
  useEffect(() => {
    if (album) {
      // Isi form saat data 'album' berhasil diterima
      setTitle(album.title);
      setDescription(album.description || "");
    }
  }, [album]); // <-- useEffect ini akan jalan setiap kali data 'album' berubah

  // 3. Mutasi Update Info Album (Judul/Deskripsi)
  const updateInfoMutation = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      api.patch(`/galleries/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminGalleryDetail", id] });
      alert("Info album diperbarui!");
    },
  });

  // ... (Sisa kode service.ts Anda sudah benar) ...
  // (Fungsi addPhotosMutation, deletePhotoMutation, handleFileChange, removeNewFile,
  // handleSubmitInfo, dan handleUploadNewPhotos semuanya sama)

  // 3. Mutasi Hapus 1 Foto
  const deletePhotoMutation = useMutation({
    mutationFn: (photoId: number) => api.delete(`/galleries/photos/${photoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminGalleryDetail", id] });
    },
  });

  // 4. Mutasi Tambah Foto Baru
  const addPhotosMutation = useMutation({
    mutationFn: (formData: FormData) =>
      api.post(`/galleries/${id}/photos`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminGalleryDetail", id] });
      // Kosongkan preview setelah berhasil
      setFiles([]);
      setPreviews([]);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeNewFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Submit form info album
  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateInfoMutation.mutate({ title, description });
  };

  // Submit upload foto baru
  const handleUploadNewPhotos = () => {
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));
    addPhotosMutation.mutate(formData);
  };

  if (isLoadingAlbum) return <AdminLayout>Memuat data album...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <Link
          to="/admin/galeri"
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft size={20} className="mr-1" /> Kembali ke Galeri
        </Link>

        {/* Form Edit Info Album */}
        <form
          onSubmit={handleSubmitInfo}
          className="bg-white p-6 rounded-xl shadow-sm space-y-4 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800">Edit Info Album</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kegiatan *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Singkat
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateInfoMutation.isPending}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {updateInfoMutation.isPending ? (
                <Loader2 size={18} className="mr-2 animate-spin" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              Simpan Perubahan
            </button>
          </div>
        </form>

        {/* Area Manajemen Foto */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Manajemen Foto
          </h2>

          {/* Grid Foto yang SUDAH ada */}
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Foto Saat Ini ({album?.images?.length || 0})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {album?.images?.map((img) => (
              <div
                key={img.id}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border"
              >
                <img
                  src={`http://localhost:5000/uploads/gallery/${img.filePath}`}
                  alt="Foto"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Yakin hapus foto ini dari album?")) {
                      deletePhotoMutation.mutate(img.id);
                    }
                  }}
                  disabled={deletePhotoMutation.isPending}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {album?.images?.length === 0 && (
              <p className="text-sm text-gray-500 italic">Album ini kosong.</p>
            )}
          </div>

          {/* Upload Foto BARU */}
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Upload Foto Baru
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border"
              >
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewFile(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500 font-medium">
                Tambah Foto
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {files.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleUploadNewPhotos}
                disabled={addPhotosMutation.isPending}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {addPhotosMutation.isPending ? (
                  <Loader2 size={18} className="mr-2 animate-spin" />
                ) : (
                  <Upload size={18} className="mr-2" />
                )}
                Upload {files.length} Foto Baru
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
