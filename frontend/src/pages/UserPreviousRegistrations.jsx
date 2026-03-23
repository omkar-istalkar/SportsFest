import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { motion } from "framer-motion";

export default function UserPreviousRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      const res = await api.get("/api/user/dashboard/registrations");
      setRegistrations(res.data);
    } catch (err) {
      console.error("Failed loading registrations", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-background min-h-screen text-white">

      <Sidebar role="USER" />

      <main className="flex-1 ml-0 md:ml-[220px] px-4 sm:px-6 lg:px-8 py-6">

        <Header role="USER" name="User" />

        {/* Page Title */}
        <div className="mb-6 sm:mb-8">

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Previous Applied Events
          </h1>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            View all the events you have registered for and track their status.
          </p>

        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-gradient-to-br
            from-slate-800/60
            to-slate-900/70
            backdrop-blur-xl
            border border-border
            rounded-2xl
            p-4 sm:p-6
            shadow-xl
          "
        >

          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Your Registrations
          </h2>

          {loading ? (
            <p className="text-gray-400 text-sm">
              Loading registrations...
            </p>
          ) : registrations.length === 0 ? (
            <p className="text-gray-400 text-sm">
              You have not registered for any events yet.
            </p>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm min-w-[600px]">

                <thead className="text-gray-400 border-b border-border">
                  <tr>
                    <th className="py-3">Reg ID</th>
                    <th className="py-3">Event</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>

                <tbody>

                  {registrations.map((reg) => (

                    <tr
                      key={reg.id}
                      className="border-b border-border hover:bg-white/5 transition"
                    >

                      <td className="py-3 whitespace-nowrap">
                        REG-{reg.id}
                      </td>

                      <td className="py-3">
                        {reg.event?.name}
                      </td>

                      <td className="py-3 text-gray-300 whitespace-nowrap">
                        {reg.registeredAt?.split("T")[0]}
                      </td>

                      <td className="py-3">

                        <span
                          className={`
                            px-3 py-1 text-xs rounded-full font-medium
                            ${reg.status === "APPROVED" && "bg-green-500/20 text-green-400"}
                            ${reg.status === "REJECTED" && "bg-red-500/20 text-red-400"}
                            ${reg.status === "PENDING" && "bg-yellow-500/20 text-yellow-400"}
                          `}
                        >
                          {reg.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </motion.div>

      </main>

    </div>
  );
}