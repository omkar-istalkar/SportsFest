import { X } from "lucide-react";

const FilePreviewModal = ({ url, type, onClose }) => {
  if (!url) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#020617] p-4 rounded-xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-2">
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {type?.startsWith("image") && (
          <img src={url} className="max-h-[80vh] mx-auto" />
        )}

        {type === "application/pdf" && (
          <iframe src={url} className="w-full h-[80vh]" />
        )}

        {!type?.startsWith("image") &&
          type !== "application/pdf" && (
            <div className="text-white text-center">
              Preview not supported
            </div>
          )}
      </div>
    </div>
  );
};

export default FilePreviewModal;