import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/dashboard/revenue",{withCredentials:true});
      console.log(res.data)
      setRevenueData(res.data);
    } catch (err) {
      console.error("Error fetching revenue", err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = revenueData.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-[220px]">
        <Header />

        <div className="overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Revenue Overview
          </h1>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-border bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] shadow-xl"
          >
            <p className="text-muted-foreground text-sm">Total Revenue</p>

            <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mt-2">
              ₹ {totalRevenue.toLocaleString()}
            </h2>
          </motion.div>

          {/* Loader */}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading revenue...</p>
          ) : (
            <div className="rounded-xl border border-border bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="bg-black/30 text-muted-foreground">
                    <tr>
                      <th className="py-3 px-4">Revenue ID</th>
                      <th className="px-4">Event</th>
                      <th className="px-4">Participants</th>
                      <th className="px-4">Fee</th>
                      <th className="px-4">Total Revenue</th>
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
                        <td className="py-3 px-4 font-medium">{rev.id}</td>
                        <td className="px-4">{rev.event}</td>
                        <td className="px-4">{rev.participants}</td>
                        <td className="px-4">₹ {rev.fee}</td>
                        <td className="px-4 text-green-400 font-medium">
                          ₹ {rev.total.toLocaleString()}
                        </td>
                    
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Revenue;