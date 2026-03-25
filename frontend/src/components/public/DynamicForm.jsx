import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ❌ REMOVED ExcelUploadField + ExcelPreview

export default function DynamicForm({ fields = [], eventId }) {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [excelFiles, setExcelFiles] = useState({}); // ✅ ADDED
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  /* ================= FETCH ALL EVENTS ================= */

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/events", {
        withCredentials: true,
      });

      console.log("FULL RESPONSE:", res);
      setEvents(res.data);
    } catch (error) {
      console.error("Error loading events", error);
    }
  };

  /* ================= GET SELECTED EVENT ================= */

  const selectedEvent =
    events.length > 0 ? events.find((e) => e.id === Number(eventId)) : null;

  console.log("EVENTS:", events);
  console.log("EVENT ID:", eventId);

  /* ================= FORM HANDLING ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (fieldId, file) => {
    setFiles((prev) => ({
      ...prev,
      [fieldId]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("eventId", eventId);

    // ✅ Send JSON data
    data.append("data", JSON.stringify(formData));

    // ✅ Send normal files
    Object.keys(files).forEach((fieldId) => {
      data.append("files", files[fieldId]);
      data.append("fileFieldIds", fieldId);
    });

    // ✅ Send Excel files (NEW)
    Object.keys(excelFiles).forEach((fieldId) => {
      data.append("excelFiles", excelFiles[fieldId]);
      data.append("excelFieldIds", fieldId);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/registrations/submit-registration",
        data,
        { withCredentials: true }
      );

      const regId = res.data?.registrationId;

      if (!regId) {
        alert("Registration completed but ID not returned");
        return;
      }

      navigate(`/registration-success/${regId}`);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        w-full max-w-2xl
        p-6 sm:p-8
        rounded-2xl
        border border-border
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
        "
      >
        {/* EVENT DETAILS */}
        {selectedEvent ? (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {selectedEvent.name}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base mb-2">
              {selectedEvent.description}
            </p>

            <span className="inline-block px-4 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
              Deadline: {selectedEvent.deadline}
            </span>
          </div>
        ) : (
          <p className="text-center text-gray-400 mb-6">
            Loading event details...
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => {
            const label = field.label || field.fieldLabel;
            const type = (field.type || field.fieldType || "").toUpperCase();
            const options = field.options ? field.options.split(",") : [];

            /* TEXT + NUMBER */
            if (type === "TEXT" || type === "NUMBER") {
              return (
                <div key={field.id}>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    {label} {field.required && "*"}
                  </label>

                  <input
                    type={type === "NUMBER" ? "number" : "text"}
                    name={field.id}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white"
                  />
                </div>
              );
            }

            /* RADIO */
            if (type === "RADIO") {
              return (
                <div key={field.id}>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    {label} {field.required && "*"}
                  </label>

                  <div className="flex flex-col gap-2">
                    {options.map((opt, index) => (
                      <label key={index} className="flex items-center gap-2 text-gray-300">
                        <input
                          type="radio"
                          name={field.id}
                          value={opt}
                          required={field.required}
                          onChange={handleChange}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            /* DROPDOWN */
            if (type === "SELECT" || type === "DROPDOWN") {
              return (
                <div key={field.id}>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    {label}
                  </label>

                  <select
                    name={field.id}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white"
                  >
                    <option value="">Select</option>
                    {options.map((opt, index) => (
                      <option key={index} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            /* FILE */
            if (type === "FILE") {
              return (
                <div key={field.id}>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    {label} {field.required && "*"}
                  </label>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.docx,.txt"
                    required={field.required}
                    onChange={(e) =>
                      handleFileChange(field.id, e.target.files[0])
                    }
                  />
                </div>
              );
            }

            /* CHECKBOX */
            if (type === "CHECKBOX") {
              return (
                <div key={field.id} className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    name={field.id}
                    onChange={handleChange}
                  />
                  {label}
                </div>
              );
            }

            /* 🔥 EXCEL FIELD (UPDATED) */
            if (type === "EXCEL") {
              return (
                <div key={field.id}>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    {label} {field.required && "*"}
                  </label>

                  <input
                    type="file"
                    accept=".xlsx"
                    required={field.required}
                    onChange={(e) =>
                      setExcelFiles((prev) => ({
                        ...prev,
                        [field.id]: e.target.files[0],
                      }))
                    }
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Upload Excel (.xlsx)
                  </p>
                </div>
              );
            }

            return null;
          })}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-green-500 text-white"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}