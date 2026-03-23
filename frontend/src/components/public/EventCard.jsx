import { Link } from "react-router-dom";

export default function EventCard({ event }) {

  return (
    <div className="event-card p-4 sm:p-5 flex flex-col gap-3">

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold truncate">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2">
        {event.description}
      </p>

      {/* Details */}
      <div className="text-sm space-y-1">

        <p className="break-words">
          <b>Date:</b> {event.eventDate}
        </p>

        <p className="break-words">
          <b>Location:</b> {event.location}
        </p>

      </div>

      {/* Button */}
      <Link
        to={`/register/${event.id}`}
        className="
          register-btn
          text-center
          w-full sm:w-auto
          mt-2
        "
      >
        Register
      </Link>

    </div>
  );
}