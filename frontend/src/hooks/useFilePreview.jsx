import { useState } from "react";

const useFilePreview = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [excelId, setExcelId] = useState(null);

  const previewFile = async (fileId) => {
    try {
      if (!fileId) {
        alert("Invalid file ID ❌");
        return;
      }

      const res = await fetch(`http://localhost:8080/api/files/${fileId}`);

      if (!res.ok) {
        alert(`File not found (ID: ${fileId}) ❌`);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      setPreviewType(blob.type);
      setExcelId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const previewExcel = (id) => {
    if (!id) {
      alert("Invalid Excel ID ❌");
      return;
    }

    setExcelId(id);
    setPreviewUrl(null);
    setPreviewType(null);
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(null);
    setPreviewType(null);
    setExcelId(null);
  };

  return {
    previewUrl,
    previewType,
    previewFile,
    previewExcel,
    excelId,
    closePreview,
  };
};

export default useFilePreview;