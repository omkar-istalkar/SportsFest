import { Link } from "react-router-dom";

export default function EventCard({ event }) {

  return (
    <div className="event-card">

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>
        <b>Date:</b> {event.eventDate}
      </p>

      <p>
        <b>Location:</b> {event.location}
      </p>

      <Link to={`/register/${event.id}`} className="register-btn">
        Register
      </Link>

    </div>
  );
}