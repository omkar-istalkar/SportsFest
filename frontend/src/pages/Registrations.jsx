import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { X } from "lucide-react";
import { renderValue } from "../lib/renderValue.jsx";
import FilePreviewModal from "../components/FilePreviewModal";
import useFilePreview from "../hooks/useFilePreview.jsx";
import ExcelPreview from "../components/Excelpreview.jsx";

const API = "http://localhost:8080/api";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [fields, setFields] = useState([]);
  const [transFields, setTransFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // ✅ RECEIPT STATE (ADDED)
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const [showTransaxtion, setShowTransaction] = useState(false);

  // ✅ FILE/EXCEL HOOK
  const {
    previewUrl,
    previewType,
    previewFile,
    previewExcel,
    excelId,
    closePreview,
  } = useFilePreview();

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

  const openTransaction = async( reg) => {
    setShowTransaction(reg);
    try {
      const regId = reg?.registrationId;
      console.log("Registrationid :- ",regId);
      console.log("Reg : ",reg);
      if (regId) {
        const resData = await axios.get(`${API}/transaction/${regId}`, {withCredentials:true});
        console.log(resData.data);
        setTransFields( resData.data);
      }
    } catch (error) {
      console.error("Failed loading transaction details:", error);
    }
  };

  const approveTrans = async (id) => {
    await axios.post(
      `${API}/transaction/approve/${id}`,
      {},
      { withCredentials: true }
    );openTransaction()
    alert("Payment Approved")
  };

  const rejectTrans = async (id) => {
    await axios.post(
      `${API}/transaction/reject/${id}`,
      {},
      { withCredentials: true }
    );openTransaction()
    alert("Payment Rejected")
  };

  // ✅ RECEIPT PREVIEW FUNCTION (ADDED)
  const previewReceipt = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/registration/REG-${selected.id}/receipt/preview`,{credentials:"include"}
      );

      if (!res.ok) throw new Error("Failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      setReceiptUrl(url);
      setShowReceipt(true);
    } catch (err) {
      console.error(err);
      alert("Failed to preview receipt");
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
                      <th className="text-left">Manage Transactions</th>
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
                                className="px-2 py-1 bg-green-500/20 text-green-400 rounded"
                                onClick={() => approve(reg.id)}
                              >
                                Approve
                              </button>

                              <button
                                className="px-2 py-1 bg-red-500/20 text-red-400 rounded"
                                onClick={() => reject(reg.id)}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded"
                              onClick={() => openDetails(reg)}
                            >
                              View Details
                            </button>
                          )}
                        </td>
                        <td>
                          {reg?.event?.amount > 0 ? (
                            <div>
                              <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded"
                                onClick={() => openTransaction(reg)}>
                                View Transaction
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button className="px-8 py-1 bg-green-500/20 text-white-300 rounded">Free  event</button>
                            </div>
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
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border shadow-2xl bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-border">
              <h2 className="text-lg font-semibold">Registration Details</h2>
              <button onClick={() => setSelected(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-2 mb-4 text-sm">
                <p><b>ID:</b> REG-{selected.id}</p>
                <p><b>Status:</b> {selected.status}</p>
                <p><b>Date:</b> {selected.registeredAt}</p>
              </div>

              <hr className="mb-4" />

              {/* ✅ HEADER + BUTTON */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Submitted Details</h3>

                <button
                  onClick={previewReceipt}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  📄 View Receipt
                </button>
              </div>

              <table className="w-full text-sm border">
                <tbody>
                  {fields.map((field) => {
                    const data = selected.dynamicData
                      ? JSON.parse(selected.dynamicData)
                      : {};

                    return (
                      <tr key={field.id}>
                        <td className="p-2">{field.label}</td>
                        <td>{renderValue(data[field.id], previewFile, previewExcel)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <FilePreviewModal url={previewUrl} type={previewType} onClose={closePreview} />
              {excelId && <ExcelPreview excelId={excelId} onClose={closePreview} />}
            </div>
          </motion.div>
        </div>
      )}

      {/* Transaction DETAILS MODAL */}
      {showTransaxtion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border shadow-2xl bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-border">
              <h2 className="text-lg font-semibold">Transaction Details</h2>
              <button onClick={() => setShowTransaction(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-2 mb-4 text-sm">
                <p><b>ID:</b> REG-{showTransaxtion.id}</p>
                <p><b>Status:</b> {showTransaxtion.status}</p>
                <p><b>Date:</b> {showTransaxtion.registeredAt}</p>
              </div>

              <hr className="mb-4" />

              {/* ✅ HEADER + BUTTON */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Transaction Details</h3>
                </div>
                  <table className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-700">
                    <tbody className="text-sm text-gray-200">

                      {/* Row */}
                      <tr className="bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-400 w-1/2">
                          Transaction ID
                        </td>
                        <td className="px-4 py-3 text-gray-100 break-all">
                          {transFields?.transactionId}
                        </td>
                      </tr>

                      <tr className="bg-gray-850">
                        <td className="px-4 py-3 font-medium text-gray-400">
                          Transaction Amount
                        </td>
                        <td className="px-4 py-3 text-gray-100 font-medium">
                          ₹ {transFields?.amount}
                        </td>
                      </tr>

                    {transFields?.status=="PENDING" ?(
                    <>
                    <tr className="bg-gray-800">
                      <td className="px-4 py-3 font-medium text-gray-400">
                        Transaction Status
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            transFields?.status === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : transFields?.status === "SUCCESS"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transFields?.status}
                        </span>
                      </td>
                    </tr>
                    
                    <tr className="bg-gray-850">
                        <td className="px-4 py-3 font-medium text-gray-400">
                          Have you received payment?
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button className="px-4 py-1.5 bg-green-500 text-white text-xs font-medium rounded-md hover:bg-green-600 transition shadow" onClick={()=>approveTrans(transFields?.registrationId)}>
                              Yes
                            </button>
                            <button className="px-4 py-1.5 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition shadow" onClick={() => rejectTrans(transFields?.registrationId)}>
                              No
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                    ):
                    (
                    <tr className="bg-gray-800">
                      <td className="px-4 py-3 font-medium text-gray-400">
                        Transaction Status
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              transFields?.status === "SUCCESS"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transFields?.status}
                        </span>
                      </td>
                    </tr>
                    ) 
                    }
                    </tbody>
                  </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* ✅ RECEIPT PREVIEW MODAL */}
      {showReceipt && receiptUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4">
          <div className="bg-[#020617] p-3 rounded-xl w-full max-w-4xl">
            <div className="flex justify-end">
              <button onClick={() => setShowReceipt(false)}>
                <X />
              </button>
            </div>

            <iframe src={receiptUrl} className="w-full h-[80vh]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Registrations;