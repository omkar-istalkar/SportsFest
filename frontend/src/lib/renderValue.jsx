export const renderValue = (value, previewFile) => {
  if (!value) return "-";

  if (typeof value === "object") {
    if (value.fileId) {
      return (
        <button
          onClick={() => previewFile(value.fileId)}
          className="text-blue-400 underline"
        >
          👁 View File
        </button>
      );
    }
    return JSON.stringify(value);
  }

  return value;
};