import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

export default function VerifyCaptchaPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const eventInfo = location.state?.event;

  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // 🔥 Fetch captcha + event
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
  const res = await api.get("/global-events/generate-captcha", {
    params: { eventId: eventInfo.id }
  });
  setCaptcha(res.data.captcha);
};


  const verifyCaptcha = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/global-events/verify-captcha", null ,{
        params:{captcha: input}
      });
      if (res.data) {
        alert("Captcha verification success");
        console.log(eventInfo);
        navigate("/global-events/event-registration", {state:{eventInfo}})
      }else{alert(" Captcha verification failed "); fetchCaptcha()}
    } catch (err) {
      setError("Invalid captcha. Try again.");
      console.log(err);
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-aurora opacity-30 blur-3xl"></div>

      {/* 🔐 Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[380px] p-[1px] rounded-2xl 
        bg-gradient-to-br from-neon-purple/40 to-neon-cyan/40"
      >
        <div className="rounded-2xl p-6 backdrop-blur-xl bg-card/80 border border-border shadow-xl">

          {/* 🔐 Title */}
          <h2 className="text-2xl font-semibold text-center mb-2 glow-text">
            Verify Access
          </h2>

          <p className="text-center text-sm text-muted-foreground mb-4">
            {eventInfo?.title || "Selected Event"}
          </p>

          {/* 🧾 CAPTCHA DISPLAY */}
          <motion.div
            key={captcha}
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            className="text-center text-2xl tracking-widest font-mono 
            py-3 rounded-lg mb-4 
            bg-gradient-to-r from-cyan-400/20 to-purple-500/20 
            border border-cyan-400/40 shadow-inner"
          >
            {captcha}
          </motion.div>

          {/* 🔄 Refresh */}
          <div className="flex justify-end mb-3">
            <button
              onClick={fetchCaptcha}
              className="text-xs text-cyan-400 hover:underline"
            >
              🔄 Refresh
            </button>
          </div>

          {/* ✏️ Input */}
          <input
            type="text"
            placeholder="Enter captcha"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border 
            focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* ❌ Error */}
          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">
              {error}
            </p>
          )}

          {/* 🚀 Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={verifyCaptcha}
            disabled={loading}
            className="mt-5 w-full py-2 rounded-full 
            bg-gradient-to-r from-primary to-accent text-white 
            shadow-md disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </motion.button>

          {/* 🔙 Back */}
          <button
            onClick={() => navigate("/global-events")}
            className="mt-3 w-full text-xs text-muted-foreground hover:underline"
          >
            ← Back to Events
          </button>

        </div>
      </motion.div>

      {/* ✨ Styles */}
      <style>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(0,200,255,0.6),
                       0 0 40px rgba(150,0,255,0.5);
        }
      `}</style>
    </div>
  );
}