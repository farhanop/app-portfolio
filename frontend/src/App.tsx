import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicLayout from "./components/layouts/PublicLayout";
import Home from "./pages/public/Home";
import StrukturPage from "./pages/public/StrukturPage";
import BeritaList from "./pages/public/BeritaList";
import BeritaDetail from "./pages/public/BeritaDetail";
import BiroPage from "./pages/public/BiroPage";
import ManageBerita from "./pages/admin/ManageBerita";
import BeritaForm from "./pages/admin/BeritaForm";
import EditBerita from "./pages/admin/EditBerita";
import ManageDokumen from "./pages/admin/ManageDokumen";
import DokumenForm from "./pages/admin/DokumenForm";
import ManageStruktur from "./pages/admin/ManageStruktur";
import ManageGaleri from "./pages/admin/ManageGaleri";
import GaleriForm from "./pages/admin/GaleriForm";
import DokumenPage from "./pages/public/DokumenPage";
import GaleriPage from "./pages/public/GaleriPage";
import ProfilPage from "./pages/public/ProfilPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route path="/struktur" element={<StrukturPage />} />
      <Route path="/berita" element={<BeritaList />} />
      <Route path="/berita/:slug" element={<BeritaDetail />} />
      <Route path="/biro/bauk" element={<BiroPage type="BAUK" />} />
      <Route path="/biro/bpt" element={<BiroPage type="BPT" />} />
      <Route path="/profil" element={<ProfilPage />} />
      <Route path="/galeri" element={<GaleriPage />} />
      <Route path="/dokumen" element={<DokumenPage />} />

      {/* === RUTE ADMIN === */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/berita"
        element={
          <ProtectedRoute>
            <ManageBerita />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/berita/tambah"
        element={
          <ProtectedRoute>
            <BeritaForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dokumen"
        element={
          <ProtectedRoute>
            <ManageDokumen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dokumen/tambah"
        element={
          <ProtectedRoute>
            <DokumenForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/struktur"
        element={
          <ProtectedRoute>
            <ManageStruktur />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/galeri"
        element={
          <ProtectedRoute>
            <ManageGaleri />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/galeri/tambah"
        element={
          <ProtectedRoute>
            <GaleriForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/berita/edit/:id"
        element={
          <ProtectedRoute>
            <EditBerita />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
