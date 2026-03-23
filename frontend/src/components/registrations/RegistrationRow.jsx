import axios from "axios";

const API = "http://localhost:8080/api/registrations";

const RegistrationRow = ({ reg, fields, reload, onSelect }) => {
  const data = reg.dynamicData ? JSON.parse(reg.dynamicData) : {};

  const approve = async (id) => {
    await axios.put(`${API}/approve/${id}`, {}, { withCredentials: true });
    reload();
  };

  const reject = async (id) => {
    await axios.put(`${API}/reject/${id}`, {}, { withCredentials: true });
    reload();
  };

  return (
    <tr
      className="border-b border-border hover:bg-yellow-500/5 cursor-pointer"
      onClick={() => onSelect(reg)}
    >
      {/* ID */}
      <td className="py-3 px-2 whitespace-nowrap text-sm">
        SF-{reg.id}
      </td>

      {/* Dynamic Fields */}
      {fields.map((field) => (
        <td
          key={field.id}
          className="px-2 py-3 text-sm max-w-[150px] truncate"
        >
          {data[field.id] || "-"}
        </td>
      ))}

      {/* Status */}
      <td className="px-2 py-3 whitespace-nowrap">
        <span
          className={`
            px-3 py-1 text-xs rounded-full
            ${reg.status === "APPROVED" && "bg-green-500/20 text-green-400"}
            ${reg.status === "REJECTED" && "bg-red-500/20 text-red-400"}
            ${reg.status === "PENDING" && "bg-yellow-500/20 text-yellow-400"}
          `}
        >
          {reg.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-2 py-3">

        {reg.status === "PENDING" && (

          <div className="flex flex-wrap gap-1 sm:gap-2">

            <button
              className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                approve(reg.id);
              }}
            >
              Approve
            </button>

            <button
              className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                reject(reg.id);
              }}
            >
              Reject
            </button>

          </div>

        )}

      </td>
    </tr>
  );
};

export default RegistrationRow;