import { motion } from "framer-motion";
import api from "../../services/api";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const RegistrationTrendChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    api.get("/api/dashboard/registration-trend")
      .then(res => {

        const formatted = res.data.map(item => ({
          date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short"
          }),
          registrations: item.count
        }));

        setData(formatted);

      })
      .catch(err => console.error(err));

  }, []);

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-4 sm:p-6"
    >

      {/* TITLE */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5">

        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          Registration Trend
        </h3>

        <span className="text-xs text-muted-foreground">
          Last activity
        </span>

      </div>

      {/* RESPONSIVE CHART HEIGHT */}
      <div className="w-full h-48 sm:h-56 md:h-60">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />

            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                fontSize: "12px"
              }}
            />

            <Line
              type="monotone"
              dataKey="registrations"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </motion.div>

  );

};

export default RegistrationTrendChart;