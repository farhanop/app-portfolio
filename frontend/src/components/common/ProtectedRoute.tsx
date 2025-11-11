import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[]; // Opsional: jika kita ingin batasi halaman tertentu hanya untuk 'superadmin'
}

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Jika sedang loading cek status login, tampilkan spinner/loading text
  if (isLoading) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }

  // Jika tidak ada user login, redirect ke /login
  // 'state={{ from: location }}' berguna agar setelah login bisa balik ke halaman semula
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika halaman butuh role khusus (misal: superadmin) dan user tidak punya role itu
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="p-8 text-center text-red-600">
        Akses Ditolak: Anda tidak memiliki izin.
      </div>
    );
  }

  // Jika lolos semua pengecekan, tampilkan halaman yang diminta
  return <>{children}</>;
}
