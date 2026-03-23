import { motion } from "framer-motion";
import { X } from "lucide-react";

const RegistrationDetailsModal = ({ registration, fields, close }) => {
  const data = registration.dynamicData
    ? JSON.parse(registration.dynamicData)
    : {};

  return (
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

        <div className="flex flex-wrap justify-between items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
          <h2 className="text-base sm:text-lg font-semibold truncate">
            Registration Details
          </h2>

          <button onClick={close}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-2 mb-5 sm:mb-6 text-sm sm:text-base">
            <p className="break-words">
              <span className="font-semibold">Registration ID:</span> SF-
              {registration.id}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`
px-2 py-1 text-xs rounded-full
${registration.status === "APPROVED" && "bg-green-500/20 text-green-400"}
${registration.status === "REJECTED" && "bg-red-500/20 text-red-400"}
${registration.status === "PENDING" && "bg-yellow-500/20 text-yellow-400"}
`}
              >
                {registration.status}
              </span>
            </p>

            <p className="break-words">
              <span className="font-semibold">Registered At:</span>{" "}
              {registration.registeredAt}
            </p>
          </div>

          <hr className="border-border mb-4" />

          <h3 className="font-semibold mb-3 text-sm sm:text-base">
            Submitted Details
          </h3>

          {/* TABLE WRAPPER */}
          <div className="overflow-x-auto">
            <table className="min-w-[500px] w-full text-sm border border-border">
              <tbody>
                {fields.map((field) => (
                  <tr key={field.id} className="border-b border-border">
                    <td className="px-3 sm:px-4 py-2 font-medium w-[40%] break-words">
                      {field.label}
                    </td>

                    <td className="px-3 sm:px-4 py-2 break-words">
                      {data[field.id] || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationDetailsModal;
