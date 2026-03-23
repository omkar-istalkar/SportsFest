import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getResponses, getFields } from "../../services/eventService";

import RegistrationsTable from "./RegistrationsTable";
import RegistrationDetailsModal from "./RegistrationDetailsModal";

const RegistrationsModal = ({ event, close }) => {
  const modalRef = useRef();

  const [registrations, setRegistrations] = useState([]);
  const [fields, setFields] = useState([]);
  const [selected, setSelected] = useState(null);

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

  return (
    <motion.div
      onMouseDown={handleOutside}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="
          w-full max-w-6xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border border-border
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

        {/* CONTENT */}
        <div className="p-4 sm:p-6">
          <RegistrationsTable
            registrations={registrations}
            fields={fields}
            reload={loadData}
            onSelect={setSelected}
          />
        </div>
      </motion.div>

      {/* DETAILS MODAL */}
      {selected && (
        <RegistrationDetailsModal
          registration={selected}
          fields={fields}
          close={() => setSelected(null)}
        />
      )}
    </motion.div>
  );
};

export default RegistrationsModal;