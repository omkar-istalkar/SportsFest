import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { X } from "lucide-react";
import { renderValue } from "../lib/renderValue.jsx";
import FilePreviewModal from "../components/FilePreviewModal";
import useFilePreview from "../hooks/useFilePreview.jsx";

const API = "http://localhost:8080/api";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // ✅ HOOK (correct usage)
  const { previewUrl, previewType, previewFile, closePreview } =
    useFilePreview();

  const loadData = async () => {
    try {
      setLoading(true);
      const resRegs = await axios.get(`${API}/registrations`, {
        withCredentials: true,
      });
      setRegistrations(resRegs.data);
    } catch (err) {
      console.error("Failed loading registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const approve = async (id) => {
    await axios.post(
      `${API}/registrations/approve/${id}`,
      {},
      { withCredentials: true }
    );
    loadData();
  };

  const reject = async (id) => {
    await axios.post(
      `${API}/registrations/reject/${id}`,
      {},
      { withCredentials: true }
    );
    loadData();
  };

  const openDetails = async (reg) => {
    setSelected(reg);
    try {
      const eventId = reg.event?.id;
      if (eventId) {
        const resFields = await axios.get(`${API}/fields/event/${eventId}`, {
          withCredentials: true,
        });
        setFields(
          Array.isArray(resFields.data)
            ? resFields.data
            : resFields.data.data || []
        );
      }
    } catch (err) {
      console.error("Failed loading fields:", err);
    }
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-[220px]">
        <Header title="Registrations" />

        <div className="p-4 sm:p-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-xl font-semibold mb-6"
          >
            All Registrations
          </motion.h1>

          <div className="glass-card rounded-xl border border-border overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                Loading registrations...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full text-sm">
                  <thead className="border-b border-border/40 text-muted-foreground">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {registrations.map((reg, i) => (
                      <motion.tr
                        key={reg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border/40 hover:bg-muted/10"
                      >
                        <td className="p-3 whitespace-nowrap font-medium">
                          REG-{reg.id}
                        </td>

                        <td className="whitespace-nowrap">
                          <span
                            className={`
px-3 py-1 text-xs rounded-full font-medium
${reg.status === "APPROVED" && "bg-green-500/20 text-green-400"}
${reg.status === "REJECTED" && "bg-red-500/20 text-red-400"}
${reg.status === "PENDING" && "bg-yellow-500/20 text-yellow-400"}
`}
                          >
                            {reg.status}
                          </span>
                        </td>

                        <td>
                          {reg.status === "PENDING" ? (
                            <div className="flex flex-wrap gap-2">
                              <button
                                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-green-500/20 text-green-400 rounded"
                                onClick={() => approve(reg.id)}
                              >
                                Approve
                              </button>

                              <button
                                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500/20 text-red-400 rounded"
                                onClick={() => reject(reg.id)}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              className="px-3 py-1 text-xs sm:text-sm bg-blue-500/20 text-blue-400 rounded"
                              onClick={() => openDetails(reg)}
                            >
                              View Details
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
w-full max-w-xl
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
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 border-b border-border">
              <h2 className="text-base sm:text-lg font-semibold">
                Registration Details
              </h2>

              <button onClick={() => setSelected(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-2 mb-5 text-sm">
                <p>
                  <b>Registration ID:</b> REG-{selected.id}
                </p>
                <p>
                  <b>Status:</b> {selected.status}
                </p>
                <p>
                  <b>Registered At:</b> {selected.registeredAt}
                </p>
              </div>

              <hr className="border-border mb-4" />

              <h3 className="font-semibold mb-3 text-sm sm:text-base">
                Submitted Details
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-[400px] w-full text-sm border border-border">
                  <tbody>
                    {fields.map((field) => {
                      const data = selected.dynamicData
                        ? JSON.parse(selected.dynamicData)
                        : {};

                      return (
                        <tr key={field.id} className="border-b border-border">
                          <td className="px-3 py-2 font-medium break-words">
                            {field.label}
                          </td>

                          <td>
                            {renderValue(data[field.id], previewFile)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* ✅ PREVIEW MODAL (kept as you wrote, just correctly placed) */}
                <FilePreviewModal
                  url={previewUrl}
                  type={previewType}
                  onClose={closePreview}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Registrations;