import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function RegistrationSuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (showReceipt) {
      fetchReceipt();
    }
  }, [showReceipt]);

  const fetchReceipt = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/transaction/${id}`, {credentials:"include"});
      const res1 = await fetch(`http://localhost:8080/api/auth/${id}`, {credentials:"include"})
      const data = await res.json();
      const data1 = await res1.json();
      setReceiptData(data);
      setUserData(data1);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadReceipt = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/registration/${id}/receipt`,
        { credentials: "include" }
      );

      if (!res.ok) {
        throw new Error("Download failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt_${id}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error(err);
      alert("Failed to download receipt");
    }
  };

  function check(receiptData) {
    if (receiptData?.amount > 0) {
      return (
        <>
          <p><b>Amount:</b> {receiptData.amount}</p>
          <p><b>Status:</b> {receiptData.status}</p>
        </>
      );
    }
    return null; // nothing if condition fails
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm p-6 rounded-xl border border-border glass-card text-center"
      >
        <h1 className="text-xl font-semibold mb-4">
          Registration Successful
        </h1>

        <p className="text-muted-foreground mb-4">
          Your registration ID
        </p>

        <div className="text-2xl font-bold mb-6">
          {id}
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => setShowReceipt(true)}
            className="px-4 py-2 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:scale-105 transition"
          >
            View Receipt
          </button>

          <button
            onClick={() => navigate("/registration-status")}
            className="px-4 py-2 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          >
            Check Registration Status
          </button>

          <button
            onClick={() => navigate("/events")}
            className="px-4 py-2 rounded-md bg-muted/20 hover:bg-muted/30"
          >
            Back to Events
          </button>

        </div>
      </motion.div>

      {/* 🔥 RECEIPT MODAL */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray/60 backdrop-blur-sm">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[90%] max-w-md bg-slate-900 border border-gray-700 rounded-xl p-6 shadow-2xl"
          >

            {/* Header */}
            <h2 className="text-lg font-bold text-center mb-4">
              {userData?.eventName || "Loading..."}
            </h2>

            <p className="text-center text-sm text-gray-400 mb-4">
              Registration Receipt
            </p>

            <div className="border-t border-gray-700 my-3"></div>

            {/* Info */}
            <div className="text-sm space-y-2">
              <p><b>Registration ID:</b> {id}</p>
              <p><b>Date:</b> {new Date().toLocaleString()}</p>
            </div>

            <div className="border-t border-gray-700 my-3"></div>

            {/* Static preview */}
            <div className="text-sm space-y-2">
              <p><b>Transaction ID:</b> {receiptData?.transactionId || "Loading..."}</p>
              <p><b>Aggregator Name:</b> {userData?.name || "Loading..."}</p>
              <p><b>Aggregator Email:</b> {userData?.email || "Loading..."}</p>
              {check(receiptData)}
            </div>

            <div className="border-t border-gray-700 my-3"></div>

            <p className="text-center text-xs text-gray-500">
              Thank you for registering!
            </p>

            {/* Download */}
            <button
                onClick={downloadReceipt}
                className="mt-4 w-full px-4 py-2 rounded-md bg-green-500/20 text-white hover:bg-green-500/30 hover:scale-[1.02] transition"
              >
                Download Receipt
            </button>

            {/* Close */}
            <button
              onClick={() => setShowReceipt(false)}
              className="mt-4 w-full px-4 py-2 rounded-md bg-red-500/20 text-white-400 hover:bg-red-500/30"
            >
              Close
            </button>

          </motion.div>
        </div>
      )}

    </div>
  );
}