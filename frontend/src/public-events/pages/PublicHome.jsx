import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SportsFestLanding() {
  const [events, setEvents] = useState([]);
  const [dark, setDark] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate();

  // 🌗 Theme Toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // 🚀 Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/events`
        );

        const formatted = res.data
          .filter((e) => e.active)
          .map((e) => ({
            id: e.id,
            title: e.name,
            date: e.deadline,
            isPaid: e.isPaid,
            desc: e.description,
            amount: e.amount,
          }));

        setEvents(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ⏳ Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};

      events.forEach((event) => {
        const diff = new Date(event.date) - new Date();

        if (diff > 0) {
          updated[event.id] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            mins: Math.floor((diff / (1000 * 60)) % 60),
            secs: Math.floor((diff / 1000) % 60),
          };
        }
      });

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-500 relative overflow-hidden">

      {/* 🌈 Aurora Background */}
      <div className="absolute inset-0 bg-aurora opacity-20 dark:opacity-50 blur-3xl"></div>

      {/* 🔥 Navbar */}
      <div className="relative z-10 flex justify-between items-center p-5 m-4 rounded-2xl
        backdrop-blur-xl bg-card dark:bg-card/80 border border-border shadow-lg">

        <h1 className="text-xl font-heading flex items-center gap-2">
          🏆 <span className="gradient-text">Sports Fest</span>
        </h1>

        {/* 🌗 Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-2 px-3 py-1 rounded-full 
          bg-muted border border-border"
        >
          <span className="text-lg">{dark ? "🌙" : "🌞"}</span>

          <div className="w-10 h-5 bg-muted rounded-full flex items-center px-1">
            <div
              className={`w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 transform transition ${
                dark ? "translate-x-5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* 🧾 Header */}
      <div className="text-center mt-14 mb-14">
        <h2 className="text-5xl font-heading glow-text mb-3">
          Explore Events
        </h2>
        <p className="text-muted-foreground">
          Join exciting competitions and showcase your skills
        </p>
      </div>

      {/* 🔥 STATES */}
      {loading ? (
        <div className="text-center text-lg animate-pulse mt-20">
          Loading events...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-20">
          {error}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-muted-foreground mt-20">
          No events available
        </div>
      ) : (
        <div className="grid gap-8 px-6 pb-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.06, rotateY: 6 }}
              className="group p-[1px] rounded-2xl 
              bg-gradient-to-br from-neon-purple/40 to-neon-cyan/40 
              hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] transition"
            >
              <div className="relative rounded-2xl p-5 flex flex-col justify-between h-full
                backdrop-blur-xl bg-card dark:bg-card/80 border border-border shadow-xl">

                {/* 🎯 Ribbon */}
                <div className="absolute top-0 right-0 overflow-hidden w-24 h-24">
                  <div
                    className={`absolute top-3 right-[-28px] rotate-45 text-[10px] font-semibold text-white px-8 py-[2px] shadow-lg ${
                      event.isPaid
                        ? "bg-gradient-to-r from-orange-500 to-pink-500"
                        : "bg-gradient-to-r from-green-400 to-emerald-500"
                    }`}
                  >
                    {event.isPaid ? "PAID" : "FREE"}
                  </div>
                </div>

                {/* 🧾 CONTENT */}
                <div className="space-y-3">

                  <h2 className="text-lg font-semibold leading-tight">
                    {event.title}
                  </h2>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.desc}
                  </p>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                   Entry Fees : ₹ {event.amount || 0}
                  </p>

                  {timeLeft[event.id] && (
                    <div className="text-xs text-cyan-400 font-medium">
                      ⏳ {timeLeft[event.id].days}d : {timeLeft[event.id].hours}h :
                      {timeLeft[event.id].mins}m : {timeLeft[event.id].secs}s
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Registration closes:{" "}
                    <span className="text-foreground font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>



                {/* 🔘 BUTTON */}
                <button
                  className="mt-5 w-full py-2 rounded-full 
                  bg-gradient-to-r from-primary to-accent text-white
                  hover:scale-105 transition shadow-md"
                  onClick={() =>
                    navigate("/global-events/verify-captcha", {state:{event}})
                  }
                >
                  Register Now
                </button>

              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✨ Styles */}
      <style>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(255,255,255,0.6),
                       0 0 40px rgba(0,200,255,0.5);
        }

        .gradient-text {
          background: linear-gradient(90deg, #ff8a00, #e52e71);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}