import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { motion } from "framer-motion";
import { CalendarDays, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="flex bg-background min-h-screen">

      <Sidebar role="USER" />

      <main className="flex-1 ml-[220px] p-6">

        <Header role="USER" name="User" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mt-6"
        >

          {/* List Events */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-card border rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate("/events")}
          >

            <div className="flex items-center gap-4">

              <div className="p-3 bg-primary/20 rounded-lg">
                <CalendarDays className="text-primary" size={26} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">List of Events</h2>
                <p className="text-sm text-muted-foreground">
                  Browse all available events
                </p>
              </div>

            </div>

          </motion.div>

          {/* Previous Events */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-card border rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate("/registration-status")}
          >

            <div className="flex items-center gap-4">

              <div className="p-3 bg-primary/20 rounded-lg">
                <ClipboardList className="text-primary" size={26} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Previously Applied Events</h2>
                <p className="text-sm text-muted-foreground">
                  Check your registrations
                </p>
              </div>

            </div>

          </motion.div>

        </motion.div>

      </main>
    </div>
  );
};

export default UserDashboard;