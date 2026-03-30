import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const RegistrationDetailsModal = ({ registration, fields, close }) => {
  const data = registration.dynamicData
    ? JSON.parse(registration.dynamicData)
    : {};

  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  // ✅ NEW STATE (Excel)
  const [excelData, setExcelData] = useState(null);

  // ✅ FETCH FILE FOR PREVIEW
  const previewFile = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/files/${fileId}`);

      if (!res.ok) throw new Error("Failed to fetch file");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      setPreviewType(blob.type);
    } catch (err) {
      console.error(err);
      alert("Failed to preview file");
    }
  };

  // ✅ NEW: FETCH EXCEL DATA
  const previewExcel = async (excelId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/excel/${excelId}`);

      if (!res.ok) throw new Error("Failed to fetch excel");

      const data = await res.json();

      setExcelData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load excel");
    }
  };

  // ✅ CLOSE FILE PREVIEW
  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewType(null);
  };

  // ✅ HANDLE VALUE (UPDATED)
  const renderValue = (value) => {
  if (!value) return "-";

  if (typeof value === "object") {

    if (value.fileId) {
      return (
        <button
          onClick={() => previewFile(value.fileId)}
          className="text-blue-400 hover:text-blue-300 underline"
        >
          👁 View File
        </button>
      );
    }

    if (value.type === "excel") {
      return (
        <button
          onClick={() => previewExcel(value.excelUploadId)}
          className="text-green-400 hover:text-green-300 underline"
        >
          📊 View Excel
        </button>
      );
    }

    return JSON.stringify(value);
  }

  return value;
};
  return (
    <>
      {/* MAIN MODAL */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={close}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="
w-full max-w-2xl
max-h-[90vh]
overflow-y-auto
rounded-2xl
border border-border
shadow-2xl
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold">
              Registration Details
            </h2>

            <button onClick={close}>
              <X size={20} />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {/* INFO */}
            <div className="space-y-2 mb-6">
              <p>
                <b>Registration ID:</b> {registration.registrationId}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs
                  ${
                    registration.status === "APPROVED" &&
                    "bg-green-500/20 text-green-400"
                  }
                  ${
                    registration.status === "REJECTED" &&
                    "bg-red-500/20 text-red-400"
                  }
                  ${
                    registration.status === "PENDING" &&
                    "bg-yellow-500/20 text-yellow-400"
                  }
                  `}
                >
                  {registration.status}
                </span>
              </p>

              <p>
                <b>Registered At:</b> {registration.registeredAt}
              </p>
            </div>

            <hr className="mb-4 border-border" />

            <h3 className="font-semibold mb-3">
              Submitted Details
            </h3>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <tbody>
                  {fields.map((field) => (
                    <tr key={field.id} className="border-b border-border">
                      <td className="px-4 py-2 font-medium w-[40%]">
                        {field.label}
                      </td>

                      <td className="px-4 py-2">
                        {renderValue(data[field.id])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* FILE PREVIEW MODAL */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4"
          onClick={closePreview}
        >
          <div
            className="bg-[#020617] rounded-xl p-3 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button onClick={closePreview}>
                <X />
              </button>
            </div>

            {previewType.startsWith("image") && (
              <img src={previewUrl} className="max-h-[80vh] mx-auto" />
            )}

            {previewType === "application/pdf" && (
              <iframe src={previewUrl} className="w-full h-[80vh]" />
            )}

            {!previewType.startsWith("image") &&
              previewType !== "application/pdf" && (
                <div className="text-white text-center">
                  Preview not supported
                </div>
              )}
          </div>
        </div>
      )}

      {/* 🔥 EXCEL PREVIEW MODAL */}
      {excelData && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4"
          onClick={() => setExcelData(null)}
        >
          <div
            className="bg-[#020617] rounded-xl p-4 max-w-5xl w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button onClick={() => setExcelData(null)}>
                <X />
              </button>
            </div>

            <h3 className="text-white mb-3">Excel Preview</h3>

            <table className="w-full text-sm border border-border">
              <thead>
                <tr>
                  {excelData.columns.map((col, i) => (
                    <th key={i} className="border px-2 py-1 text-white">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border px-2 py-1 text-gray-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationDetailsModal;