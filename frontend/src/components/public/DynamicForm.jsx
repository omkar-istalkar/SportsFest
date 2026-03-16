import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DynamicForm({ fields = [], eventId }) {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append("eventId", eventId);

    Object.keys(formData).forEach((key)=>{
      data.append(key, formData[key]);
    });

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/registrations/submit-registration",
        data,{withCredentials:true}
      );

      console.log("Registration response:", res.data);

      const regId =
        res.data.id ||
        res.data.registrationId ||
        res.data.data?.id;

      if (!regId) {
        alert("Registration completed but ID not returned from server.");
        return;
      }

      navigate(`/registration-success/${regId}`);

    }catch(error){

      console.error("Registration error:", error);
      alert("Registration failed");

    }finally{

      setLoading(false);

    }

  };

  return (

    <form onSubmit={handleSubmit} className="space-y-5">

      {fields.map((field) => {

        const label = field.label || field.fieldLabel;
        const type = (field.type || field.fieldType || "").toUpperCase();
        const options = (field.options || "").split(",");

        /* TEXT + NUMBER */

        if (type === "TEXT" || type === "NUMBER") {

          return (
            <div key={field.id}>

              <label className="block mb-1 font-semibold">
                {label} {field.required && "*"}
              </label>

              <input
                type={type === "NUMBER" ? "number" : "text"}
                name={field.id}
                required={field.required}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>
          );

        }

        /* RADIO */

        if (type === "RADIO") {

          return (
            <div key={field.id}>

              <label className="block mb-2 font-semibold">
                {label} {field.required && "*"}
              </label>

              {options.map((opt, index) => (

                <label key={index} className="flex items-center gap-2 mb-1">

                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    onChange={handleChange}
                  />

                  {opt}

                </label>

              ))}

            </div>
          );

        }

        /* DROPDOWN */

        if (type === "SELECT" || type === "DROPDOWN") {

          return (
            <div key={field.id}>

              <label className="block mb-1 font-semibold">
                {label}
              </label>

              <select
                name={field.id}
                onChange={handleChange}
                className="border p-2 w-full rounded"
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

        /* TEXTAREA */

        if (type === "TEXTAREA") {

          return (
            <div key={field.id}>

              <label className="block mb-1 font-semibold">
                {label}
              </label>

              <textarea
                name={field.id}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

            </div>
          );

        }

        /* CHECKBOX */

        if (type === "CHECKBOX") {

          return (
            <div key={field.id} className="flex items-center gap-2">

              <input
                type="checkbox"
                name={field.id}
                onChange={handleChange}
              />

              <label className="font-semibold">
                {label}
              </label>

            </div>
          );

        }

        return null;

      })}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>

    </form>

  );

}