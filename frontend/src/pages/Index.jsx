import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "@/components/dashboard/Sidebar.jsx";
import Header from "@/components/dashboard/Header.jsx";
import StatCards from "@/components/dashboard/StatCards.jsx";
import RecentEvents from "@/components/dashboard/RecentEvents.jsx";
import PendingApprovals from "@/components/dashboard/PendingApprovals.jsx";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines.jsx";
import EventTypeChart from "../components/dashboard/EventTypeChart";
import RegistrationTrendChart from "../components/dashboard/RegistrationTrendChart";

import axios from "axios";

const Index = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      await axios.get(
        "http://localhost:8080/api/events",
        { withCredentials: true }
      );
      setLoading(false);
    } catch (error) {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm sm:text-base">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">

      <Sidebar />

      <main className="flex-1 ml-0 md:ml-[220px] px-4 sm:px-6 lg:px-8 py-6">

        <Header role="ADMIN" name="Admin" />

        {/* Stats */}
        <StatCards />

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <RecentEvents />
          <PendingApprovals />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <UpcomingDeadlines />
          <EventTypeChart />
          <RegistrationTrendChart />
        </div>

      </main>

    </div>
  );
};

export default Index;