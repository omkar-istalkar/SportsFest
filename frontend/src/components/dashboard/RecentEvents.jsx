import { useEffect, useState } from "react";
import api from "../../services/api";
import { CalendarDays, Users, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RecentEvents = () => {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/dashboard/recent-events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const getDeadlineColor = (date) => {
    const today = new Date();
    const deadline = new Date(date);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "text-red-400";
    if (diff <= 3) return "text-yellow-400";
    return "text-cyan-400";
  };

  return (
    <div className="glass-card p-4 sm:p-6 hover:border-primary/30 transition-all duration-300">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">

        <div className="flex items-center gap-2 min-w-0">
          <CalendarDays className="text-primary shrink-0" size={20} />

          <h2 className="text-base sm:text-lg font-semibold text-foreground truncate">
            Recent Events
          </h2>
        </div>

        {/* View All Button */}
        <button
          onClick={() => navigate("/events-dashboard")}
          className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition font-medium"
        >
          View All →
        </button>

      </div>

      {/* TABLE WRAPPER (KEY FIX) */}
      <div className="overflow-x-auto">

        <table className="min-w-[600px] w-full text-sm">

          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left pb-3">Event</th>
              <th className="text-left pb-3">Deadline</th>
              <th className="text-left pb-3">Type</th>
              <th className="text-left pb-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {events.slice(0, 5).map((event, i) => (

              <motion.tr
                key={event.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group border-b border-border/40 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-200 cursor-pointer"
              >

                {/* Event Name */}
                <td className="py-3 relative max-w-[200px]">

                  <div className="flex items-center gap-2 font-medium text-foreground truncate">

                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></span>

                    <span className="truncate">
                      {event.name}
                    </span>

                  </div>

                  {/* Tooltip (desktop only) */}
                  <div className="hidden sm:block absolute left-0 top-8 w-64 p-3 rounded-lg bg-card border border-border text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl z-50">
                    {event.description}
                  </div>

                </td>

                {/* Deadline */}
                <td className={`font-medium ${getDeadlineColor(event.deadline)}`}>
                  {new Date(event.deadline).toLocaleDateString()}
                </td>

                {/* Event Type */}
                <td>

                  {event.registrationType === "TEAM" ? (

                    <span className="flex items-center gap-1 text-blue-400 whitespace-nowrap">
                      <Users size={14} /> Team
                    </span>

                  ) : (

                    <span className="flex items-center gap-1 text-purple-400 whitespace-nowrap">
                      <User size={14} /> Individual
                    </span>

                  )}

                </td>

                {/* Status */}
                <td>

                  {event.active ? (

                    <span className="px-3 py-1 text-xs rounded-full bg-green-500/15 text-green-400 font-medium shadow-sm whitespace-nowrap">
                      Active
                    </span>

                  ) : (

                    <span className="px-3 py-1 text-xs rounded-full bg-red-500/15 text-red-400 font-medium shadow-sm whitespace-nowrap">
                      Closed
                    </span>

                  )}

                </td>

              </motion.tr>

            ))}

            {events.length === 0 && (

              <tr>
                <td colSpan="4" className="text-center py-8 sm:py-10 text-muted-foreground">
                  No events available
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentEvents;