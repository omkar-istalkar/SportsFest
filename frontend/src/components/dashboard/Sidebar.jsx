import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  DollarSign,
  HelpCircle,
  CheckSquare
} from "lucide-react";
import { NavLink } from "react-router-dom";

/* ---------------- ADMIN NAVIGATION ---------------- */

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CalendarDays, label: "Events", path: "/events-dashboard" },
  { icon: ClipboardList, label: "Registrations", path: "/registrations" },
  { icon: DollarSign, label: "Revenue -static data", path: "/revenue" },
];

/* ---------------- USER NAVIGATION ---------------- */

const userNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/user-dashboard" },
  { icon: CalendarDays, label: "List of Events", path: "/events" },
  { icon: ClipboardList, label: "Previous Applied Events", path: "/user-previous-registrations" },
  { icon: CheckSquare, label: "Check Registration Status", path: "/registration-status" }
];

/* ---------------- BOTTOM MENU ---------------- */

const bottomItems = [
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const Sidebar = ({ role = "ADMIN", isOpen, setIsOpen }) => {

  const navItems = role === "USER" ? userNavItems : adminNavItems;

  return (
    <>
      {/* OVERLAY (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}

      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 z-30
          h-screen
          w-64 sm:w-[220px]
          bg-sidebar border-r border-sidebar-border
          flex flex-col
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >

        {/* LOGO */}
        <div className="p-4 sm:p-5 flex items-center gap-3">

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-lg sm:text-xl">🏆</span>
          </div>

          <div>
            <h1 className="font-bold text-foreground text-sm leading-tight">
              SportsFest
            </h1>
            <hr />
            <p className="text-[10px] text-muted-foreground">
              Event Management
            </p>
          </div>

        </div>

        <hr />

        {/* NAVIGATION */}
        <nav className="flex-1 px-2 sm:px-3 mt-3 sm:mt-4 space-y-1">

          {navItems.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >

                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)} // mobile auto close
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition 
                    ${
                      isActive
                        ? "bg-primary/20 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                    }`
                  }
                >

                  <Icon size={18} />

                  <span className="truncate">{item.label}</span>

                </NavLink>

              </motion.div>

            );

          })}

        </nav>

        <hr className="border-border my-2" />

        {/* BOTTOM ITEMS */}
        <div className="px-2 sm:px-3 pb-4 space-y-1">

          {bottomItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/20 hover:text-foreground transition"
              >

                <Icon size={18} />

                <span className="truncate">{item.label}</span>

              </NavLink>

            );

          })}

        </div>

      </motion.aside>
    </>
  );
};

export default Sidebar;