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
      className="glass-card p-6"
    >

      {/* TITLE */}
      <div className="flex items-center justify-between mb-5">

        <h3 className="text-lg font-semibold text-foreground">
          Registration Trend
        </h3>

        <span className="text-xs text-muted-foreground">
          Last activity
        </span>

      </div>


      <div className="w-full h-56">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
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
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </motion.div>

  );
};

export default RegistrationTrendChart;