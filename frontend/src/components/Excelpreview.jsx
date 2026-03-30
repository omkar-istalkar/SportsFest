import { useEffect, useState } from "react";
import { X } from "lucide-react";

const ExcelPreview = ({ excelId, onClose }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExcel = async () => {
      try {
        console.log("Fetching Excel ID:", excelId);

        const res = await fetch(`http://localhost:8080/api/excel/${excelId}`,{credentials:"include"});

        const contentType = res.headers.get("content-type");

        if (!res.ok) throw new Error("Excel fetch failed");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response (not JSON)");
        }

        const json = await res.json();

        // ✅ VALIDATE STRUCTURE
        if (!json.columns || !json.rows) {
          throw new Error("Invalid Excel format from backend");
        }

        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    if (excelId) fetchExcel();
  }, [excelId]);

  // ❌ ERROR UI
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[60]">
        <div className="bg-red-900 text-white p-4 rounded">
          ❌ {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-[60] p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#020617] rounded-xl p-4 max-w-6xl w-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold">
            Excel Preview
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-sm border border-border">
            <thead className="sticky top-0 bg-gray-900">
              <tr>
                {data.columns.map((col, i) => (
                  <th
                    key={i}
                    className="border px-3 py-2 text-white text-left"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border px-3 py-2 text-gray-300"
                    >
                      {cell || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExcelPreview;