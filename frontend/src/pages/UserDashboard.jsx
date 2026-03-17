import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { motion } from "framer-motion";
import { Trophy, CalendarDays, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function useCountUp(target = 0, duration = 1000) {

  const [value, setValue] = useState(0);

  useEffect(() => {

    let start = 0;

    const step = target / (duration / 16);

    const timer = setInterval(() => {

      start += step;

      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }

    }, 16);

    return () => clearInterval(timer);

  }, [target, duration]);

  return value;
}


/* Stat Card */

const StatCard = ({ title, value, Icon, gradient }) => {

  const displayValue = useCountUp(value);

  return (
    <motion.div
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative rounded-xl p-6 text-white shadow-xl ${gradient}
      border border-white/10 backdrop-blur-md overflow-hidden`}
    >

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm opacity-70">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{displayValue}</h3>
        </div>

        <div className="p-3 rounded-lg bg-white/10 border border-white/20">
          <Icon size={22} />
        </div>

      </div>

    </motion.div>
  );
};



const UserDashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    registered: 0,
    completed: 0
  });

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {

    fetchDashboardStats();
    fetchUserRegistrations();

  }, []);



  const fetchDashboardStats = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/user/dashboard/stats",{withCredentials:true}
      );

      setStats(prev => ({
        ...prev,
        totalEvents: res.data.totalEvents,
        activeEvents: res.data.activeEvents,
        registered: res.data.registeredEvents,
        completed: res.data.completedEvents
      }));

    } catch (error) {

      console.error("Error fetching stats:", error);

    }

  };



  const fetchUserRegistrations = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/user/dashboard/registrations",{withCredentials:true}
      );

      setRegistrations(res.data);

      const completedCount =
        res.data.filter(r => r.status === "COMPLETED").length;

      setStats(prev => ({
        ...prev,
        completed: completedCount
      }));

    } catch (error) {

      console.error("Error fetching registrations:", error);

    }

  };



  const getStatusStyle = (status) => {

    if (status === "APPROVED")
      return "bg-green-500/20 text-green-400";

    if (status === "PENDING")
      return "bg-yellow-500/20 text-yellow-400";

    if (status === "COMPLETED")
      return "bg-blue-500/20 text-blue-400";

    return "bg-gray-500/20 text-gray-300";
  };



  return (

    <div className="flex bg-background min-h-screen text-white">

      <Sidebar role="USER" />

      <main className="flex-1 ml-[220px] p-6">

        <Header role="USER" name="User" />



        {/* Stats Cards */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6"
        >

          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            Icon={Trophy}
            gradient="bg-gradient-to-br from-indigo-900/40 via-indigo-700/30 to-indigo-600/10"
          />

          <StatCard
            title="Active Events"
            value={stats.activeEvents}
            Icon={CalendarDays}
            gradient="bg-gradient-to-br from-purple-900/40 via-purple-700/30 to-pink-700/10"
          />

          <StatCard
            title="Registered Events"
            value={stats.registered}
            Icon={CalendarDays}
            gradient="bg-gradient-to-br from-fuchsia-900/40 via-fuchsia-700/30 to-rose-700/10"
          />

          <StatCard
            title="Completed Events"
            value={stats.completed}
            Icon={CheckCircle}
            gradient="bg-gradient-to-br from-blue-900/40 via-cyan-700/30 to-blue-600/10"
          />

        </motion.div>



        {/* My Registrations */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-xl border border-white/10
          bg-gradient-to-br from-slate-900/60 to-slate-800/40
          backdrop-blur-xl shadow-2xl p-6"
        >

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-xl font-semibold">
                My Registrations
              </h2>

              <p className="text-gray-400 text-sm">
                Your latest registrations and their status
              </p>
            </div>

            <button
              onClick={() => navigate("/user-previous-registrations")}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View All
            </button>

          </div>


          <table className="w-full text-sm">

            <thead className="text-gray-400 border-b border-white/10">

              <tr>
                <th className="text-left py-3">Reg ID</th>
                <th className="text-left py-3">Event</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Status</th>
              </tr>

            </thead>

            <tbody>

              {registrations.reverse().slice(0,5).map((r) => (

                <tr
                  key={r.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-4 font-medium">
                    {r.registrationId}
                  </td>

                  <td className="py-4 font-medium">
                    {r.event?.name}
                  </td>

                  <td className="py-4 text-gray-300">
                    {r.registeredAt?.split("T")[0]}
                  </td>

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(r.status)}`}
                    >
                      {r.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </motion.div>

      </main>

    </div>

  );

};

export default UserDashboard;