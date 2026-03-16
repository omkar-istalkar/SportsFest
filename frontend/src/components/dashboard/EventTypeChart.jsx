import { motion } from "framer-motion";
import api from "../../services/api";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = ["#38bdf8", "#a78bfa"];

const EventTypeChart = () => {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    api.get("/api/dashboard/event-types")
      .then(res => {

        const team = res.data.team;
        const individual = res.data.individual;
        const totalEvents = team + individual;

        const chartData = [
          {
            name: "Team Events",
            value: team,
            percent: totalEvents ? Math.round((team / totalEvents) * 100) : 0
          },
          {
            name: "Individual Events",
            value: individual,
            percent: totalEvents ? Math.round((individual / totalEvents) * 100) : 0
          }
        ];

        setData(chartData);
        setTotal(totalEvents);

      })
      .catch(err => console.error(err));

  }, []);

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h3 className="text-lg font-semibold text-foreground">
          Event Types
        </h3>

        <span className="text-xs text-muted-foreground">
          Total: {total}
        </span>

      </div>


      <div className="grid grid-cols-2 gap-6 items-center">

        {/* LEFT ANALYTICS */}
        <div className="space-y-6">

          {data.map((item, index) => (

            <div key={index}>

              {/* LABEL ROW */}
              <div className="flex items-center justify-between mb-1">

                <div className="flex items-center gap-2">

                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></span>

                  <span className="text-sm text-muted-foreground ">
                    {item.name}
                  </span>

                </div>

                <span className="text-sm font-semibold text-foreground">
                  {item.value} ({item.percent}%)
                </span>

              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />

              </div>

            </div>

          ))}

          {/* INSIGHT */}
          <div className="text-xs text-muted-foreground pt-2">

            {data.length === 2 && data[0]?.percent === data[1]?.percent
              ? "Balanced distribution of events"
              : data[0]?.percent > data[1]?.percent
              ? "Team events dominate the festival"
              : "Individual events dominate the festival"}

          </div>

        </div>


        {/* PIE CHART */}
        <div className="w-44 h-44 justify-self-end">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  fontSize: "12px"
                }}
              />

              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                stroke="none"
                animationDuration={900}
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                    style={{ cursor: "pointer" }}
                  />

                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </motion.div>

  );

};

export default EventTypeChart;