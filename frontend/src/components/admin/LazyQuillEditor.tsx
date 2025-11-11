import { Suspense, lazy } from "react";
// HAPUS import type { ReactQuillProps }... (karena ini yang error)
import "react-quill-new/dist/quill.snow.css";

const LazyQuill = lazy(() => import("react-quill-new"));

// GANTI 'props: ReactQuillProps' menjadi 'props: any'
const LazyQuillEditor = (props: any) => {
  return (
    <Suspense
      fallback={
        <div className="h-full border rounded-md flex items-center justify-center text-gray-400">
          Loading editor...
        </div>
      }
    >
      <LazyQuill {...props} />
    </Suspense>
  );
};

export default LazyQuillEditor;
