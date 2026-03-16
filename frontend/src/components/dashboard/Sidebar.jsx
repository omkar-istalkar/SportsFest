import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  DollarSign,
  HelpCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CalendarDays, label: "Events", path: "/events-dashboard" },
  { icon: ClipboardList, label: "Registrations", path: "/registrations" },
  { icon: DollarSign, label: "Revenue", path: "/revenue" },
];

const bottomItems = [
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[220px] min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-30"
    >

      {/* LOGO */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <span className="text-xl">🏆</span>
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
      <nav className="flex-1 px-3 mt-4 space-y-1">

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

                <span>{item.label}</span>

              </NavLink>

            </motion.div>

          );

        })}

      </nav>


      <hr className="border-border my-2" />


      {/* BOTTOM ITEMS */}
      <div className="px-3 pb-4 space-y-1">

        {bottomItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/20 hover:text-foreground transition"
            >

              <Icon size={18} />

              <span>{item.label}</span>

            </NavLink>

          );

        })}

      </div>

    </motion.aside>
  );
};

export default Sidebar;