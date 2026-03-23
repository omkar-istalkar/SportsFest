import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

const Revenue = () => {
  const revenueData = [
    {
      id: "REV-101",
      event: "Cricket Tournament",
      participants: 120,
      fee: 500,
      total: 60000,
      date: "2026-03-01",
    },

    {
      id: "REV-102",
      event: "Football Championship",
      participants: 80,
      fee: 400,
      total: 32000,
      date: "2026-03-02",
    },

    {
      id: "REV-103",
      event: "Badminton Singles",
      participants: 60,
      fee: 300,
      total: 18000,
      date: "2026-03-03",
    },

    {
      id: "REV-104",
      event: "Chess Competition",
      participants: 40,
      fee: 200,
      total: 8000,
      date: "2026-03-04",
    },

    {
      id: "REV-105",
      event: "Athletics 100m",
      participants: 100,
      fee: 250,
      total: 25000,
      date: "2026-03-05",
    },
  ];

  const totalRevenue = revenueData.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-[220px]">
        <Header />

        <div className="overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Revenue Overview (in development)
          </h1>

          {/* Revenue Summary */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
mb-6 sm:mb-8
p-4 sm:p-6
rounded-xl
border border-border
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
shadow-xl
"
          >
            <p className="text-muted-foreground text-sm">Total Revenue</p>

            <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mt-2">
              ₹ {totalRevenue.toLocaleString()}
            </h2>
          </motion.div>

          {/* Table Wrapper */}

          <div
            className="
rounded-xl
border border-border
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
shadow-xl
overflow-hidden
"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-black/30 text-muted-foreground">
                  <tr>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-left">
                      Revenue ID
                    </th>

                    <th className="px-4 sm:px-6 text-left">Event</th>

                    <th className="px-4 sm:px-6 text-left">Participants</th>

                    <th className="px-4 sm:px-6 text-left">Fee</th>

                    <th className="px-4 sm:px-6 text-left">Total Revenue</th>

                    <th className="px-4 sm:px-6 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {revenueData.map((rev, i) => (
                    <motion.tr
                      key={rev.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/40 hover:bg-yellow-500/5"
                    >
                      <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium">
                        {rev.id}
                      </td>

                      <td className="px-4 sm:px-6">{rev.event}</td>

                      <td className="px-4 sm:px-6">{rev.participants}</td>

                      <td className="px-4 sm:px-6">₹ {rev.fee}</td>

                      <td className="px-4 sm:px-6 text-green-400 font-medium">
                        ₹ {rev.total.toLocaleString()}
                      </td>

                      <td className="px-4 sm:px-6 text-muted-foreground">
                        {rev.date}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
