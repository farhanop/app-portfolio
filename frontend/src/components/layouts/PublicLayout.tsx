import type { ReactNode } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />
      {/* 'flex-grow' memastikan konten mendorong footer ke bawah jika halaman pendek */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
