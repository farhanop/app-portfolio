import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import type { OrgNode } from "../../types/org";

interface AdminOrgNodeProps {
  node: OrgNode;
  onAddChild: (parentId: number) => void;
  onEdit: (node: OrgNode) => void;
  onDelete: (id: number) => void;
  level?: number; // Untuk indentasi
}

export default function AdminOrgNode({
  node,
  onAddChild,
  onEdit,
  onDelete,
  level = 0,
}: AdminOrgNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      {/* Baris Node */}
      <div
        className={`flex items-center py-2 px-3 hover:bg-gray-50 rounded-md group ${
          level === 0 ? "bg-blue-50 mb-2" : ""
        }`}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Tombol Expand/Collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mr-1 p-1 rounded hover:bg-gray-200 ${
            hasChildren ? "text-gray-500" : "text-transparent cursor-default"
          }`}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Ikon Tipe Jabatan */}
        <div
          className={`mr-3 p-1.5 rounded-md ${
            node.type === "root"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <User size={16} />
        </div>

        {/* Nama Jabatan & Pejabat */}
        <div className="flex-grow">
          <div className="font-medium text-gray-900 flex items-center">
            {node.name}
            <span className="ml-2 px-2 py-0.5 text-[10px] uppercase bg-gray-100 text-gray-600 rounded-full">
              {node.type}
            </span>
          </div>
          {node.officialName && (
            <div className="text-sm text-gray-500">{node.officialName}</div>
          )}
        </div>

        {/* Tombol Aksi (Muncul saat hover) */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 transition-opacity">
          <button
            onClick={() => onAddChild(node.id)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
            title="Tambah Bawahan"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => onEdit(node)}
            className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"
            title="Edit Jabatan"
          >
            <Edit size={16} />
          </button>
          {node.type !== "root" && ( // Root tidak boleh dihapus
            <button
              onClick={() => onDelete(node.id)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
              title="Hapus Jabatan"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Render Anak-anak secara Rekursif */}
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <AdminOrgNode
              key={child.id}
              node={child}
              level={level + 1}
              onAddChild={onAddChild}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
