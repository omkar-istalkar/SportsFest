import { motion } from "framer-motion";
import { CalendarClock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

const UpcomingDeadlines = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/dashboard/upcoming-deadlines")
      .then(res => {

        const today = new Date();

        const enriched = res.data.map(e => {

          const deadline = new Date(e.deadline);
          const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

          let status = "safe";
          let priority = 3;

          if (diff < 0) {
            status = "expired";
            priority = 4;
          }
          else if (diff <= 2) {
            status = "urgent";
            priority = 1;
          }
          else if (diff <= 5) {
            status = "soon";
            priority = 2;
          }

          return {
            ...e,
            diff,
            status,
            priority
          };

        });

        enriched.sort((a, b) => a.priority - b.priority);

        setEvents(enriched);

      })
      .catch(err => console.error(err));
  }, []);


  const getStatusStyle = (status) => {

    switch (status) {

      case "urgent":
        return "text-red-400";

      case "soon":
        return "text-yellow-400";

      case "safe":
        return "text-green-400";

      case "expired":
        return "text-gray-400";

      default:
        return "text-muted-foreground";

    }

  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-2">
          <CalendarClock className="text-primary" size={20} />
          <h2 className="text-lg font-semibold text-foreground">
            Upcoming Deadlines
          </h2>
        </div>

        <a
          href="/events-dashboard"
          className="text-sm flex items-center gap-1 text-primary hover:text-primary/80"
        >
          View All <ArrowRight size={16} />
        </a>

      </div>


      {events.length === 0 ? (

        <div className="text-center text-muted-foreground py-8 text-sm">
          No upcoming deadlines
        </div>

      ) : (

        <div className="space-y-4">

          {events.map((event, i) => (

            <motion.div
              key={event.id}

              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}

              whileHover={{ scale: 1.02 }}

              className="
              flex items-center justify-between
              p-4 rounded-xl border border-border
              bg-muted/20 backdrop-blur
              hover:border-yellow-400/70
              hover:shadow-[0_0_18px_rgba(250,204,21,0.25)]
              transition-all duration-300 cursor-pointer
              "
            >

              {/* Left */}
              <div>

                <p className="text-sm font-medium text-foreground">
                  {event.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  Deadline: {new Date(event.deadline).toLocaleDateString()}
                </p>

              </div>


              {/* Right status */}
              <span className={`text-xs font-medium ${getStatusStyle(event.status)}`}>

                {event.status === "expired" && "Expired"}

                {event.status === "urgent" && `${event.diff} day${event.diff !== 1 ? "s" : ""} left`}

                {event.status === "soon" && `${event.diff} days left`}

                {event.status === "safe" && `${event.diff} days left`}

              </span>

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>
  );
};

export default UpcomingDeadlines;