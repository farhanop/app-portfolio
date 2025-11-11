import { User } from "lucide-react";
import type { OrgNode } from "../../types/org";

interface OrgChartNodeProps {
  node: OrgNode;
  onClick: (node: OrgNode) => void;
}

export default function OrgChartNode({ node, onClick }: OrgChartNodeProps) {
  // Tentukan warna background berdasarkan tipe jabatan
  const bgColor =
    node.type === "root"
      ? "bg-blue-900 text-white"
      : node.type === "biro"
      ? "bg-blue-100 border-blue-300"
      : "bg-white border-gray-200";

  const textColor = node.type === "root" ? "text-white" : "text-gray-900";

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => onClick(node)}
        className={`
          w-48 p-4 rounded-lg shadow-sm border-2 cursor-pointer 
          transition-all duration-300 hover:shadow-md hover:-translate-y-1
          ${bgColor} ${node.type !== "root" ? "hover:border-blue-500" : ""}
        `}
      >
        {/* Foto Profil Kecil */}
        <div className="flex justify-center mb-3">
          {node.photoPath ? (
            <img
              src={`http://localhost:5000/uploads/profiles/${node.photoPath}`}
              alt={node.officialName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                node.type === "root"
                  ? "bg-blue-800"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <User size={32} />
            </div>
          )}
        </div>

        {/* Nama Jabatan & Pejabat */}
        <div className={`text-center ${textColor}`}>
          <h3 className="font-bold text-sm leading-tight mb-1">{node.name}</h3>
          {node.officialName && (
            <p
              className={`text-xs ${
                node.type === "root" ? "text-blue-200" : "text-gray-600"
              }`}
            >
              {node.officialName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
