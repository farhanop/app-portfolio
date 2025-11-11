📋 TASK LIST - Web Portofolio Warek 2
✅ FASE 1: Inisialisasi Proyek (DONE)
[x] Setup Monorepo Folder Structure (frontend/ & backend/).

[x] Frontend: Inisialisasi React + Vite + TypeScript.

[x] Frontend: Instalasi & Konfigurasi Tailwind CSS v4.

[x] Backend: Inisialisasi NestJS Framework.

[x] Backend: Konfigurasi environment variables (.env).

[x] Database: Setup MySQL database db_warek2.

[x] Database: Koneksi sukses Backend ke MySQL via TypeORM.

✅ FASE 2: Backend Core & Database Schema (IN PROGRESS)
[x] Schema: Buat Entity User (Admin) dengan Role Enum.

[x] Schema: Buat Entity OrgPosition dengan struktur Tree/Hierarchy.

[x] Schema: Buat Entity News (Berita) + relation ke User.

[x] Schema: Buat Entity Gallery & GalleryImage.

[x] Schema: Buat Entity Document (Pengumuman PDF).

[x] Schema: Buat Entity BiroProfile & ExternalLink.

[x] Seeding: Buat script untuk input data awal (Super Admin default & Root Struktur Organisasi).

⏳ FASE 3: Authentication & Authorization (PENDING)
[x] Auth: Implementasi Login (JWT Token).

[x] Auth: Buat Decorator @Roles() untuk proteksi endpoint (RBAC).

[x] Auth: Implementasi Guard untuk cek token valid di setiap request.

⏳ FASE 4: Backend Modules / API (PENDING)
[x] File Upload: Setup Multer untuk simpan gambar/dokumen ke folder /uploads.

[x] API News: CRUD Berita (Create dengan upload foto, Read dengan pagination).

[x] API Org: Endpoint khusus untuk ambil data full tree structure.

[x] API Gallery: Upload multiple photos sekaligus.

[x] API Documents: Upload file PDF dan endpoint download.

⏳ FASE 5: Frontend Core & Public Pages (PENDING)
[x] Setup: Instalasi React Router & Axios.

[x] Layout: Buat Navbar & Footer responsif.

[x] Page Home: Landing page dengan hero section & quick links.

[x] Page Struktur: Render bagan organisasi interaktif dari data API.

[x] Page Berita: List berita dan detail berita.

[x] Page Biro: Halaman dinamis untuk BAUK & BPT.

⏳ FASE 6: Admin Panel / CMS (PENDING)
[ ] Auth: Halaman Login Admin & simpan token di local storage.

[x] Layout Admin: Sidebar navigation & dashboard layout.

[x] Modul Berita: Form Rich Text Editor (Quill/TinyMCE) untuk tulis berita.

[x] Modul Struktur: UI untuk tambah/edit pejabat dalam mode Tree View.

[x] Modul File: File manager sederhana untuk dokumen mahasiswa.

Simpan file ini. Setiap kali kita selesai satu langkah, kita akan kembali ke file ini untuk mencentang [x] kotak tugasnya.

Siap lanjut ke tugas berikutnya? Target kita selanjutnya: Menuntaskan Schema Database (membuat sisa Entity yang belum ada).
