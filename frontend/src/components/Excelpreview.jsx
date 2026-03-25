import { useEffect, useState } from "react";
import axios from "axios";

export default function ExcelPreview({ excelId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!excelId) return;

    axios.get(`/api/excel/${excelId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [excelId]);

  if (!data) return <p>Loading Excel...</p>;

  return (
    <div className="mt-3">
      <h5>Excel Preview</h5>

      <table className="table table-bordered">
        <thead>
          <tr>
            {data.columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}