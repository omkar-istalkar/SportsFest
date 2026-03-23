import { motion } from "framer-motion";
import { ChevronDown, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Header = ({
  role = "ADMIN",
  name = "Admin",
  toggleSidebar // ✅ NEW PROP
}) => {

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {

    try {

      await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true }
      );

      alert("Logout success");
      window.location.href = "/login";

    } catch (error) {

      console.error("Logout failed", error);
      alert("Logout failed");

    }

  };

  return (

    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="
        flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4
        mb-6 sm:mb-10
        px-2 sm:px-0 py-2
      "
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 flex-1 min-w-0">

        {/* ✅ MOBILE HAMBURGER */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-muted/20 transition"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
            Welcome back 👋
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
            {role === "ADMIN"
              ? "Here's the latest overview of your events"
              : "Browse events and manage your registrations"}
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex items-center justify-end sm:justify-normal gap-3 sm:gap-5">

        {/* PROFILE */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-2 sm:gap-3
              px-2 py-1.5
              rounded-lg
              cursor-pointer
              hover:bg-muted/20
              transition
            "
          >

            {/* AVATAR */}
            <div
              className="
                w-8 h-8 sm:w-9 sm:h-9
                rounded-full
                bg-gradient-to-br
                from-blue-500/30
                to-purple-500/30
                flex items-center justify-center
                text-xs sm:text-sm font-semibold text-blue-400
              "
            >
              {name.charAt(0)}
            </div>

            {/* NAME */}
            <span className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
              {name}
            </span>

            <ChevronDown
              size={14}
              className={`transition ${open ? "rotate-180" : ""}`}
            />

          </div>


          {/* DROPDOWN */}
          {open && (

            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                absolute right-0 mt-3 w-40
                bg-[#0f172a]
                border border-border
                rounded-lg
                shadow-xl
                py-2
                z-50
              "
            >

              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-2
                  w-full px-4 py-2
                  text-sm text-red-400
                  hover:bg-red-500/10
                  transition
                "
              >
                <LogOut size={14} />
                Logout
              </button>

            </motion.div>

          )}

        </div>

      </div>

    </motion.header>

  );

};

export default Header;