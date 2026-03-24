import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getResponses, getFields } from "../../services/eventService";
import { X } from "lucide-react";
import FilePreviewModal from "../FilePreviewModal.jsx";
import { renderValue } from "../../lib/renderValue.jsx";
import useFilePreview from "../../hooks/useFilePreview.jsx";

const ResponsesModal = ({ event, close }) => {
  const { previewUrl, previewType, previewFile, closePreview } =
    useFilePreview();

  const modalRef = useRef();

  const [registrations, setRegistrations] = useState([]);
  const [fields, setFields] = useState([]);

  const loadData = async () => {
    const resFields = await getFields(event.id);
    setFields(resFields.data);

    const resRegs = await getResponses(event.id);
    setRegistrations(resRegs.data);
  };

  useEffect(() => {
    loadData();
  }, [event.id]);

  const handleOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };

  const approveReg = async (id) => {
    await fetch(`http://localhost:8080/api/registrations/approve/${id}`, {
      method: "POST",
      credentials: "include",
    });
    loadData();
  };

  const rejectReg = async (id) => {
    await fetch(`http://localhost:8080/api/registrations/reject/${id}`, {
      method: "POST",
      credentials: "include",
    });
    loadData();
  };

  return (
    <motion.div
      onMouseDown={handleOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
w-full max-w-6xl
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
            Registrations — {event.name}
          </h2>

          <button onClick={close}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* EMPTY STATE */}

          {registrations.length === 0 && (
            <div className="text-center text-muted-foreground py-6 text-sm">
              No registrations yet
            </div>
          )}

          {/* TABLE */}

          {registrations.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full text-sm">
                <thead className="border-b border-border/40 text-muted-foreground">
                  <tr>
                    <th className="py-3 text-left">ID</th>

                    {fields.map((field) => (
                      <th
                        key={field.id}
                        className="text-left whitespace-nowrap"
                      >
                        {field.label}
                      </th>
                    ))}

                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {registrations.map((reg, i) => {
                    const data = reg.dynamicData
                      ? JSON.parse(reg.dynamicData)
                      : {};

                    return (
                      <motion.tr
                        key={reg.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border/40 hover:bg-yellow-500/5"
                      >
                        <td className="py-3 sm:py-4 whitespace-nowrap">
                          {reg.registrationId}
                        </td>

                        {fields.map((field) => (
                          <td key={field.id} className="max-w-[150px] truncate">
                            {renderValue(data[field.id], previewFile) || "-"}
                          </td>
                        ))}

                        <td className="whitespace-nowrap">
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

                        <td>
                          {reg.status === "PENDING" && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                className="px-2 sm:px-3 py-1 rounded-md bg-green-500/20 text-green-400 text-xs sm:text-sm"
                                onClick={() => approveReg(reg.id)}
                              >
                                Approve
                              </button>

                              <button
                                className="px-2 sm:px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-xs sm:text-sm"
                                onClick={() => rejectReg(reg.id)}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              <FilePreviewModal
                url={previewUrl}
                type={previewType}
                onClose={closePreview}
              />
            </div>
          )}

          {/* FOOTER */}

          <div className="flex justify-end mt-4 sm:mt-6">
            <button
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition w-full sm:w-auto"
              onClick={close}
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResponsesModal;
