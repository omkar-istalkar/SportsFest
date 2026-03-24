import { useState } from "react";

const useFilePreview = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  const previewFile = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/files/${fileId}`);

      if (!res.ok) throw new Error("File fetch failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      setPreviewType(blob.type);
    } catch (err) {
      console.error(err);
    }
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewType(null);
  };

  return { previewUrl, previewType, previewFile, closePreview };
};

export default useFilePreview;