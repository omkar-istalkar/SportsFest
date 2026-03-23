import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, getFields } from "../services/eventService";
import DynamicForm from "../components/public/DynamicForm";

export default function EventRegisterPage() {

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {

    try {

      const eventData = await getEventById(id);
      const fieldResponse = await getFields(id);

      setEvent(eventData);

      if (Array.isArray(fieldResponse.data)) {
        setFields(fieldResponse.data);
      } 
      else if (Array.isArray(fieldResponse.data.data)) {
        setFields(fieldResponse.data.data);
      } 
      else {
        setFields([]);
      }

      setLoading(false);

    } catch (error) {

      console.error("Error loading event data:", error);
      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-sm sm:text-base px-4">
        Loading registration form...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 lg:px-10 py-6 sm:py-10">

      <div className="max-w-2xl mx-auto bg-white text-black p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">
          {event?.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 break-words">
          {event?.description}
        </p>

        {/* Form */}
        <DynamicForm fields={fields} eventId={id} />

      </div>

    </div>

  );

}