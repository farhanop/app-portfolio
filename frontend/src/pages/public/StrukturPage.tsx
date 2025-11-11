// frontend/src/pages/public/StrukturPage.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { OrgNode } from "../../types/org";
import OrgTree from "../../components/org/OrgTree";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Dialog } from "@headlessui/react"; // Untuk Modal
import { X } from "lucide-react";

export default function StrukturPage() {
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [treeData, setTreeData] = useState<OrgNode | null>(null);

  // Ambil data tree dari API
  const { data, isLoading, error } = useQuery({
    queryKey: ["orgTree"],
    queryFn: async () => {
      const res = await api.get<OrgNode[]>("/org-positions/tree");
      return res.data[0]; // ambil root
    },
  });

  // Gunakan useEffect untuk menyimpan data ke state lokal dan efek samping lain
  useEffect(() => {
    if (data) {
      setTreeData(data);
      console.log("Struktur organisasi ter-load:", data);
      // Bisa tambah efek lain misal scroll otomatis ke node tertentu
    }
  }, [data]);

  if (isLoading)
    return <div className="text-center py-20">Memuat struktur...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Gagal memuat data.</div>
    );
  if (!treeData) return null;

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Struktur Organisasi
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Wakil Rektor II Bidang Administrasi Umum, Keuangan, dan SDM
        </p>

        {/* Area Bagan - Scrollable jika terlalu lebar */}
        <div className="overflow-x-auto pb-12">
          <div className="min-w-max flex justify-center p-8 bg-gray-50 rounded-xl border border-gray-200">
            <OrgTree data={treeData} onNodeClick={setSelectedNode} />
          </div>
        </div>

        {/* MODAL DETAIL PEJABAT */}
        <Dialog
          open={selectedNode !== null}
          onClose={() => setSelectedNode(null)}
          className="relative z-50"
        >
          {/* Overlay Gelap */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Posisi Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-2xl w-full relative">
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              {selectedNode && (
                <div className="text-center">
                  {/* Foto Besar di Modal */}
                  <img
                    src={
                      selectedNode.photoPath
                        ? `http://localhost:5000/uploads/profiles/${selectedNode.photoPath}`
                        : "https://placehold.co/150x150/e2e8f0/1e293b?text=No+Photo"
                    }
                    alt={selectedNode.officialName || selectedNode.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-50"
                  />
                  <Dialog.Title className="text-xl font-bold text-gray-900">
                    {selectedNode.officialName || selectedNode.name}
                  </Dialog.Title>
                  <p className="text-blue-600 font-medium mb-4">
                    {selectedNode.name}
                  </p>

                  {selectedNode.nip && (
                    <p className="text-sm text-gray-500 mb-2">
                      NIP: {selectedNode.nip}
                    </p>
                  )}

                  {/* Bio / Deskripsi Singkat */}
                  {selectedNode.bio ? (
                    <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg text-left">
                      {selectedNode.bio}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic text-sm">
                      Belum ada biodata.
                    </p>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </PublicLayout>
  );
}
