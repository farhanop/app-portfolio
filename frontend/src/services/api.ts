import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor untuk otomatis logout jika token expired (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // --- PERBAIKANNYA DI SINI ---
    const originalRequest = error.config;

    // Cek apakah errornya 401 DAN BUKAN dari request /auth/profile
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url !== "/auth/profile" &&
      window.location.pathname !== "/login"
    ) {
      // Jika ini error 401 dari API lain (misal /admin/berita)
      // baru kita redirect ke login
      window.location.href = "/login";
    }

    // Jika ini error 401 dari /auth/profile, biarkan saja (jangan redirect)
    return Promise.reject(error);
  }
);

export default api;
