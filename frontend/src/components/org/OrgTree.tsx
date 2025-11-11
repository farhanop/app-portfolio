// frontend\src\components\org\OrgTree.tsx
import type { OrgNode } from "../../types/org";
import OrgChartNode from "./OrgChartNode";

interface OrgTreeProps {
  data: OrgNode;
  onNodeClick: (node: OrgNode) => void;
}

export default function OrgTree({ data, onNodeClick }: OrgTreeProps) {
  const hasChildren = data.children && data.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Parent */}
      <OrgChartNode node={data} onClick={onNodeClick} />

      {/* Jika punya anak, gambar garis vertikal ke bawah */}
      {hasChildren && <div className="h-8 w-px bg-gray-400"></div>}

      {/* Container untuk anak-anak */}
      {hasChildren && (
        <div className="flex relative pt-4">
          {/* Garis horizontal penghubung antar anak */}
          {data.children!.length > 1 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-12rem)] h-px bg-gray-0 border-t border-gray-400"></div>
          )}

          {data.children!.map((child, _index) => (
            <div
              key={child.id}
              className="flex flex-col items-center px-4 relative"
            >
              {/* Garis vertikal kecil di atas setiap anak */}
              {data.children!.length > 1 && (
                <div className="absolute -top-4 h-4 w-px bg-gray-400 left-1/2"></div>
              )}

              {/* Panggil diri sendiri secara rekursif! */}
              <OrgTree data={child} onNodeClick={onNodeClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
