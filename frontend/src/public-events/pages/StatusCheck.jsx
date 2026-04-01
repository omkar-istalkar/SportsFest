import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


export default function StatusCheck() {
  const [regId, setRegId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    try {
      setLoading(true);

      const numericId = regId.toUpperCase().replace("REG-", "");

      const res = await axios.get(`http://localhost:8080/global-events/check-status/${regId}`, {
        withCredentials: true,
      });

      const registration = res.data

      if (!registration) {
        alert("Registration not found");
        return;
      }

      setResult(registration);
    } catch (err) {
      console.error("Failed fetching status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            🔍 Check Registration Status
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Track your event application status using your Registration ID
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT - CHECKER */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white">
              Enter Details
            </h2>

            <input
              type="text"
              placeholder="REG-1"
              value={regId}
              onChange={(e) => setRegId(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={checkStatus}
              className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition"
            >
              {loading ? "Checking..." : "Check Status"}
            </motion.button>

            {/* RESULT */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <p className="text-sm text-gray-300">
                  <b>ID:</b> {result.regId}
                </p>

                <p className="text-sm text-gray-300 mt-1">
                  <b>Event:</b> {result.event}
                </p>

                <p className="mt-3">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold
                      ${result.status === "APPROVED" && "bg-green-500/20 text-green-400"}
                      ${result.status === "REJECTED" && "bg-red-500/20 text-red-400"}
                      ${result.status === "PENDING" && "bg-yellow-500/20 text-yellow-400"}
                    `}
                  >
                    {result.status}
                  </span>
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT - INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white">
              📌 How it works
            </h2>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>• You receive a Registration ID after applying</li>
              <li>• Format: <b>REG-1, REG-2...</b></li>
              <li>• Enter it to check approval status</li>
              <li>• Approved → Eligible for event</li>
            </ul>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
              💡 Tip: You can also track all your registrations from your dashboard.
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}