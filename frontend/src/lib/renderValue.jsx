export const renderValue = (value, previewFile, previewExcel) => {
  if (!value) return "-";

  if (typeof value === "object") {

    // ✅ FILE PREVIEW
    if (value.fileId && value.fileId !== 0) {
      return (
        <button
          onClick={() => previewFile(value.fileId)}
          className="text-blue-400 underline"
        >
          👁 View File
        </button>
      );
    }

    // ✅ EXCEL PREVIEW
    if (value.type === "excel" && value.excelUploadId) {
      return (
        <button
          onClick={() => previewExcel(value.excelUploadId)}
          className="text-green-400 underline"
        >
          📊 View Excel
        </button>
      );
    }

    return JSON.stringify(value);
  }

  return value;
};