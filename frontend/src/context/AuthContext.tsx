import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "../services/api";

// Tipe data untuk user yang login
interface AuthUser {
  userId: number;
  username: string;
  role: string;
}

// Tipe data untuk value yang ada di context
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Buat Context-nya
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Buat Provider (pembungkus)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Cek status login saat load

  // Cek status login saat pertama kali buka web
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Panggil /auth/profile (yang butuh cookie)
        const response = await api.get("/auth/profile");
        setUser(response.data); // Jika sukses, user masih login
      } catch (error) {
        setUser(null); // Jika gagal (token/cookie expired), set jadi null
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  // Fungsi untuk login
  const login = async (username: string, password: string) => {
    // Panggil API Login (backend akan set cookie)
    const response = await api.post("/auth/login", { username, password });
    setUser(response.data.user); // Simpan data user ke state
  };

  // Fungsi untuk logout
  const logout = async () => {
    await api.post("/auth/logout"); // Panggil API Logout (backend hapus cookie)
    setUser(null); // Hapus data user dari state
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Buat Custom Hook (cara gampang pakai context-nya)
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
