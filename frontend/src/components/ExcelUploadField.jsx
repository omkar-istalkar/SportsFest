import { useState } from "react";
import axios from "axios";

export default function ExcelUploadField({ field, onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      // optional (only if backend needs)
      formData.append("registrationId", 0);
      formData.append("fieldId", field.id);

      const res = await axios.post(
        "http://localhost:8080/api/excel/upload", // ✅ FIXED URL
        formData,
        { withCredentials: true }
      );

      const excelId = res.data.id; // ✅ FIXED

      onUpload(field.id, excelId); // ✅ FIXED

      alert("Excel uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-3">
      <label>{field.label}</label>

      <input
        type="file"
        accept=".xlsx,.xls"
        className="form-control"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="btn btn-primary mt-2"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Excel"}
      </button>
    </div>
  );
}