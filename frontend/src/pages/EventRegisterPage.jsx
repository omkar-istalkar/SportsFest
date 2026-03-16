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

    console.log("Event:", eventData);
    console.log("Fields:", fieldResponse);

    setEvent(eventData);

    // Extract fields array correctly
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
      <div className="p-10 text-center text-white">
        Loading registration form...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <div className="max-w-2xl mx-auto bg-white text-black p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-2">
          {event?.name}
        </h2>

        <p className="text-gray-600 mb-6">
          {event?.description}
        </p>

        <DynamicForm fields={fields} eventId={id} />

      </div>

    </div>

  );

}