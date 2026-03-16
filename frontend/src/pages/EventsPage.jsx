import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function EventsPage() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await api.get("/api/events");
    setEvents(res.data);
    console.log("Event Data:", res.data);
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white">

      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-700">

        <h1 className="text-3xl font-bold tracking-wide">
          SportsFest Events
        </h1>

        <Link
          to="/login"
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-white transition"
        >
          Admin Login
        </Link>

      </div>

      {/* Events Section */}
      <div className="p-10">

        <h2 className="text-4xl font-bold mb-10 text-center">
          Available Events
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {events.map((event) => (

            <div
              key={event.id}
              className="bg-white text-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition transform duration-300"
            >

              <h3 className="text-xl font-bold mb-2">
                {event.name}
              </h3>

              <p className="text-gray-600 mb-4">
                {event.description}
              </p>

              <div className="mb-5">

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-semibold">
                  Deadline: {event.deadline}
                </span>

              </div>

              <Link
                to={`/register/${event.id}`}
                className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>

            </div>

          ))}

        </div>

        {/* Status Button */}

        <div className="text-center mt-14">

          <Link
            to="/registration-status"
            className="bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded text-white"
          >
            Check Registration Status
          </Link>

        </div>

      </div>

    </div>
  );
}