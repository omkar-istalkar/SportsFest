import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

const PendingApprovals = () => {

  const [pending, setPending] = useState([]);

  useEffect(() => {
    api.get("/api/dashboard/pending")
      .then(res => setPending(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="glass-card p-4 sm:p-6 hover:border-primary/30 transition-all duration-300">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">

        <div className="flex items-center gap-2 min-w-0">
          <Clock className="text-yellow-400 shrink-0" size={20} />

          <h2 className="text-base sm:text-lg font-semibold text-foreground truncate">
            Pending Approvals
          </h2>
        </div>

        {pending.length > 0 && (
          <a
            href="/registrations"
            className="text-xs sm:text-sm flex items-center gap-1 text-primary hover:text-primary/80 transition"
          >
            View All <ArrowRight size={16} />
          </a>
        )}

      </div>

      {pending.length === 0 ? (

        <div className="flex items-center justify-center py-8 sm:py-10 text-muted-foreground text-sm text-center">
          No pending approvals 🎉
        </div>

      ) : (

        <div className="space-y-3 sm:space-y-4">

          {pending.map((item, i) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}

              className="
                relative group
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-3 sm:gap-0
                p-3 sm:p-4 rounded-xl
                border border-border
                bg-muted/20 backdrop-blur
                hover:border-yellow-400/70
                hover:shadow-[0_0_18px_rgba(250,204,21,0.25)]
                transition-all duration-300 cursor-pointer
                hover:z-20
              "
            >

              {/* LEFT INFO */}
              <div className="min-w-0">

                <p className="text-foreground font-medium text-sm sm:text-base truncate">
                  {item.registrationId}
                </p>

                <p className="text-xs text-muted-foreground truncate">
                  {item.event?.name || "Unknown Event"}
                </p>

              </div>

              {/* STATUS */}
              <span className="self-start sm:self-auto px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
                Pending
              </span>

              {/* TOOLTIP (desktop only) */}
              <div
                className="
                  hidden sm:block
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                  w-64 p-3
                  rounded-lg bg-card border border-border
                  text-xs text-muted-foreground
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200
                  pointer-events-none shadow-xl
                  z-50
                "
              >

                <p className="font-medium text-foreground mb-1">
                  {item.event?.name}
                </p>

                <p>
                  {item.event?.description || "No description available"}
                </p>

                {/* Tooltip Arrow */}
                <div className="absolute left-1/2 -bottom-1 w-3 h-3 bg-card rotate-45 border-r border-b border-border"></div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
};

export default PendingApprovals;