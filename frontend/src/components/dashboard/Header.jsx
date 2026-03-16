import { motion } from "framer-motion";
import { Plus, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      className="flex items-center justify-between mb-10
      px-2 py-2"
    >

      {/* LEFT SIDE */}
      <div>

        <h2 className="text-2xl font-bold text-white tracking-tight">
          Welcome back 👋
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Here's the latest overview of your events
        </p>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">


        {/* PROFILE */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="
            flex items-center gap-3
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
              w-9 h-9
              rounded-full
              bg-gradient-to-br
              from-blue-500/30
              to-purple-500/30
              flex items-center justify-center
              text-sm font-semibold text-blue-400
              "
            >
              A
            </div>

            {/* NAME */}
            <span className="text-sm text-muted-foreground font-medium">
              Admin
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