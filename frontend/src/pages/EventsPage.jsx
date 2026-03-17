import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

export default function EventsPage() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await api.get("/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error loading events", error);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">

      <Sidebar role="USER" />

      <main className="flex-1 ml-[220px] p-8">

        <Header role="USER" name="User" />

        {/* Page Title */}
        <div className="mb-10 mt-6">

          <h1 className="text-4xl font-bold tracking-wide">
            Explore SportsFest Events
          </h1>

          <p className="text-gray-400 mt-2">
            Register for upcoming competitions and activities.
          </p>

        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {events.map((event) => (

            <div
              key={event.id}
              className="
              group
              relative
              bg-gradient-to-br from-slate-800 to-slate-900
              border border-slate-700
              rounded-2xl
              p-6
              shadow-xl
              transition
              duration-300
              hover:scale-105
              hover:border-blue-500
              hover:shadow-blue-900/30
              "
            >

              {/* Event Title */}
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition">

                {event.name}

              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-5">

                {event.description}

              </p>

              {/* Deadline */}
              <div className="mb-6">

                <span className="
                bg-red-500/20
                text-red-400
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                ">

                  Registration Deadline: {event.deadline}

                </span>

              </div>

              {/* Register Button */}
              <Link
                to={`/register/${event.id}`}
                className="
                block
                text-center
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                py-2
                rounded-lg
                font-semibold
                transition
                duration-300
                hover:from-blue-500
                hover:to-indigo-500
                hover:shadow-lg
                hover:shadow-blue-900/40
                "
              >

                Register Now

              </Link>

            </div>

          ))}

        </div>

        {/* Empty State */}
        {events.length === 0 && (

          <div className="text-center mt-20 text-gray-400">

            No events available right now.

          </div>

        )}

      </main>

    </div>
  );
}