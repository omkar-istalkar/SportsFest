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
    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-2">
          <CalendarDays className="text-primary" size={20} />
          <h2 className="text-lg font-semibold text-foreground">
            Recent Events
          </h2>
        </div>

        {/* View All Button */}
        <button
          onClick={() => navigate("/events")}
          className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition font-medium"
        >
          View All →
        </button>

      </div>

      {/* Events Table */}
      <table className="w-full text-sm">

        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left pb-3">Event</th>
            <th className="text-left pb-3">Deadline</th>
            <th className="text-left pb-3">Type</th>
            <th className="text-left pb-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {events.slice(0,5).map((event, i) => (

            <motion.tr
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group border-b border-border/40 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-200 cursor-pointer"
            >

              {/* Event Name */}
              <td className="py-3 relative">

                <div className="flex items-center gap-2 font-medium text-foreground">

                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

                  {event.name}

                </div>

                {/* Tooltip Description */}
                <div className="absolute left-0 top-8 w-64 p-3 rounded-lg bg-card border border-border text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl z-50">
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

                  <span className="flex items-center gap-1 text-blue-400">
                    <Users size={14} /> Team
                  </span>

                ) : (

                  <span className="flex items-center gap-1 text-purple-400">
                    <User size={14} /> Individual
                  </span>

                )}

              </td>

              {/* Status */}
              <td>

                {event.active ? (

                  <span className="px-3 py-1 text-xs rounded-full bg-green-500/15 text-green-400 font-medium shadow-sm">
                    Active
                  </span>

                ) : (

                  <span className="px-3 py-1 text-xs rounded-full bg-red-500/15 text-red-400 font-medium shadow-sm">
                    Closed
                  </span>

                )}

              </td>

            </motion.tr>

          ))}

          {events.length === 0 && (

            <tr>
              <td colSpan="4" className="text-center py-10 text-muted-foreground">
                No events available
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default RecentEvents;