import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminOrgNode from "../../components/org/AdminOrgNode";
import api from "../../services/api";
import type { OrgNode, OrgType } from "../../types/org";

export default function ManageStruktur() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);
  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    type: "jabatan" as OrgType,
    officialName: "",
    nip: "",
    bio: "",
  });

  // 1. Fetch Tree
  const { data: treeData, isLoading } = useQuery({
    queryKey: ["adminOrgTree"],
    queryFn: async () => {
      const res = await api.get<OrgNode[]>("/org-positions/tree");
      return res.data[0];
    },
  });

  // 2. Mutation Tambah
  const createMutation = useMutation({
    mutationFn: (newData: any) => api.post("/org-positions", newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrgTree"] });
      setIsModalOpen(false);
      resetForm();
      alert("Jabatan berhasil ditambahkan!");
    },
    onError: (err) => {
      console.error(err);
      alert("Gagal menambah jabatan.");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "jabatan",
      officialName: "",
      nip: "",
      bio: "",
    });
    setParentId(null);
  };

  const handleAddChild = (pId: number) => {
    setParentId(pId);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentId) return;
    createMutation.mutate({ ...formData, parentId });
  };

  if (isLoading) return <AdminLayout>Loading Tree...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Struktur Organisasi
        </h2>
        <p className="text-gray-600">Klik ikon (+) untuk menambah bawahan.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        {treeData && (
          <AdminOrgNode
            node={treeData}
            onAddChild={handleAddChild}
            onEdit={(node) => alert(`Edit ${node.name} (Coming Soon)`)}
            // Hapus parameter 'id' yang tidak terpakai
            onDelete={() => {
              if (confirm("Hapus jabatan ini DAN SEMUA BAWAHANNYA?")) {
                alert("Fitur hapus perlu diaktifkan di backend dulu.");
              }
            }}
          />
        )}
      </div>

      {/* ... sisa kode Modal ... (tetap sama) */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-bold">
                Tambah Bawahan Baru
              </Dialog.Title>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Jabatan/Unit *
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Bagian Keuangan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipe *</label>
                <select
                  className="w-full p-2 border rounded bg-white"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as OrgType,
                    })
                  }
                >
                  <option value="biro">Biro</option>
                  <option value="bagian">Bagian</option>
                  <option value="jabatan">Jabatan Struktural</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Pejabat (Opsional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.officialName}
                  onChange={(e) =>
                    setFormData({ ...formData, officialName: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium mt-4"
              >
                {createMutation.isPending ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </AdminLayout>
  );
}
