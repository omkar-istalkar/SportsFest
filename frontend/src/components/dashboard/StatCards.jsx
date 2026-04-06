import { motion } from "framer-motion";
import { Calendar, Activity, Users, DollarSign } from "lucide-react";
import api from "../../services/api";
import { useEffect, useState } from "react";

const StatCards = () => {

  const STATIC_REVENUE = 100;

  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    registrations: 0,
    revenue: 0
  });

  const [displayStats, setDisplayStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    registrations: 0,
    revenue: 0
  });

  useEffect(() => {
    api.get("/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  // Count animation
  useEffect(() => {

    const duration = 800;
    const steps = 40;

    const animateValue = (key, target) => {

      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {

        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setDisplayStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));

      }, duration / steps);

    };

    animateValue("totalEvents", stats.totalEvents);
    animateValue("activeEvents", stats.activeEvents);
    animateValue("registrations", stats.registrations);
    animateValue("revenue", stats.revenue);

  }, [stats]);

  const cards = [
    {
      label: "Total Events",
      value: displayStats.totalEvents,
      icon: Calendar,
      gradient: "from-blue-500/15 to-indigo-500/10",
      glow: "hover:shadow-blue-500/40",
      iconColor: "text-blue-400"
    },
    {
      label: "Active Events",
      value: displayStats.activeEvents,
      icon: Activity,
      gradient: "from-purple-500/15 to-pink-500/10",
      glow: "hover:shadow-pink-500/40",
      iconColor: "text-pink-400"
    },
    {
      label: "Registrations",
      value: displayStats.registrations,
      icon: Users,
      gradient: "from-cyan-500/15 to-emerald-500/10",
      glow: "hover:shadow-cyan-500/40",
      iconColor: "text-cyan-400"
    },
    {
      label: "Revenue",
      value: displayStats.revenue,
      icon: DollarSign,
      gradient: "from-yellow-500/15 to-orange-500/10",
      glow: "hover:shadow-yellow-500/40",
      iconColor: "text-yellow-400"
    }
  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">

      {cards.map((card, i) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.label}

            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}

            whileHover={{
              scale: 1.06,
              y: -8,
              rotateX: 6,
              rotateY: -6
            }}

            className={`relative p-4 sm:p-6 rounded-xl border border-border
            bg-card backdrop-blur-xl
            shadow-lg ${card.glow}
            hover:shadow-2xl
            transition-all duration-300 cursor-pointer overflow-hidden`}
          >

            {/* Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
            />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  {card.label}
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                  {card.value}
                </p>

              </div>

              <div className="p-2 sm:p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                <Icon size={20} className={card.iconColor} />
              </div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );
};

export default StatCards;