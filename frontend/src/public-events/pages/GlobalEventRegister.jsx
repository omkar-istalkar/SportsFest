import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import api from "../../services/api";

export default function GlobalEventRegister() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedEvent = location.state?.eventInfo;

  const [event, setEvent] = useState(passedEvent || null);
  const [formSchema, setFormSchema] = useState([]);

  const [staticData, setStaticData] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [excelFiles, setExcelFiles] = useState({});
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ================= INIT ================= */

  useEffect(() => {
    if (passedEvent) {
      setEvent(passedEvent);
      loadForm(passedEvent.id);
    } else {
      fetchEvent();
    }
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await axios.get("/api/public/events");
      const found = res.data.find(e => e.id == eventId);

      if (found) {
        setEvent(found);
        loadForm(found.id);
      }
    } catch {
      console.error("Event load failed");
    }
  };

  const loadForm = async (id) => {
    try {
      const res = await api.get(
        `http://localhost:8080/global-events/events-fields/${id}`,
        { withCredentials: true }
      );
      setFormSchema(res.data);
    } catch {
      alert("Session expired");
      navigate("/global-events");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */

  const handleStaticChange = (e) => {
    setStaticData({
      ...staticData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDynamicChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (id, file) => {
    setFiles(prev => ({ ...prev, [id]: file }));
  };

  const handleExcelChange = (id, file) => {
    setExcelFiles(prev => ({ ...prev, [id]: file }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};

    if (!staticData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!staticData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(staticData.email)) {
      newErrors.email = "Enter valid email";
    }

    formSchema.forEach(field => {
      if (field.required) {
        if (
          !formData[field.id] &&
          !files[field.id] &&
          !excelFiles[field.id]
        ) {
          newErrors[field.id] = `${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= 💰 RAZORPAY ================= */

  const handlePayment = async (formDataObj) => {
    try {
      const amountToPay = Number(event?.amount);

      const res = await axios.post(
        `http://localhost:8080/api/razorpay/create-order?amount=${amountToPay}`,
        {},
        { withCredentials: true }
      );

      const order = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: event?.title || event?.name,
        description: "Global Event Registration",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:8080/api/razorpay/verify",
              response,
              { withCredentials: true }
            );

            if (verifyRes.data === "SUCCESS") {

              const regRes = await axios.post(
                "http://localhost:8080/global-events/submit-registration",
                formDataObj,
                { withCredentials: true }
              );

              const regId = regRes.data?.registrationId;

              navigate(`/global-events/registration-success/${regId}`, {
                state: {
                  paymentId: response.razorpay_payment_id
                }
              });

            } else {
              alert("Payment verification failed ❌");
            }

          } catch (err) {
            console.error(err);
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled ❌");
          },
        },

        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();

    const finalData = {
      ...staticData,
      ...formData,
    };

    data.append("eventId", event.id);
    data.append("data", JSON.stringify(finalData));

    Object.keys(files).forEach(id => {
      data.append("files", files[id]);
      data.append("fileFieldIds", id);
    });

    Object.keys(excelFiles).forEach(id => {
      data.append("excelFiles", excelFiles[id]);
      data.append("excelFieldIds", id);
    });

    try {
      setSubmitting(true);

      if (event?.isPaid) {
        await handlePayment(data);
      } else {
        const res = await axios.post(
          "http://localhost:8080/global-events/submit-registration",
          data,
          { withCredentials: true }
        );

        const regId = res.data?.registrationId;
        navigate(`/global-events/registration-success/${regId}`);
      }

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {event?.title || event?.name}
          </h1>

          {event?.isPaid && (
            <p className="text-yellow-400 text-sm mt-2">
              Amount: ₹{event.amount}
            </p>
          )}

          <p className="text-gray-400 text-sm mt-2">
            Fill the form to register for this event
          </p>
        </div>

        {/* FORM */}
         <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= USER DETAILS ================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-white">👤 Your Details</h2>
            <p className="text-xs text-gray-400">
              We will use this information to contact you.
            </p>

            <div className="space-y-4 mt-4">

              {/* NAME */}
              <div>
                <label className="text-gray-300 text-sm">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={staticData.name}
                  onChange={handleStaticChange}
                  className="w-full mt-1 p-2 rounded-lg bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-green-400"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-gray-300 text-sm">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={staticData.email}
                  onChange={handleStaticChange}
                  className="w-full mt-1 p-2 rounded-lg bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-green-400"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

            </div>
          </motion.div>

          {/* DIVIDER */}
          <div className="border-t border-white/10"></div>

          {/* ================= EVENT DETAILS ================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-white">📝 Event Details</h2>
            <p className="text-xs text-gray-400">
              Fill the required information for this event.
            </p>

            <div className="space-y-5 mt-4">

              {formSchema.map(field => {
                const type = (field.fieldType || "").toUpperCase();
                const options = field.options?.split(",") || [];

                return (
                  <div key={field.id}>
                    <label className="text-gray-300 text-sm">
                      {field.label} {field.required && "*"}
                    </label>

                    {/* TEXT */}
                    {(type === "TEXT" || type === "NUMBER") && (
                      <input
                        type={type === "NUMBER" ? "number" : "text"}
                        className="w-full mt-1 p-2 rounded-lg bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-green-400"
                        onChange={(e) =>
                          handleDynamicChange(field.id, e.target.value)
                        }
                      />
                    )}

                    {/* RADIO */}
                    {type === "RADIO" &&
                      options.map((opt, i) => (
                        <label key={i} className="block text-gray-300">
                          <input
                            type="radio"
                            name={field.id}
                            value={opt}
                            onChange={(e) =>
                              handleDynamicChange(field.id, e.target.value)
                            }
                          />
                          <span className="ml-2">{opt}</span>
                        </label>
                      ))}

                    {/* DROPDOWN */}
                    {(type === "DROPDOWN" || type === "SELECT") && (
                      <select
                        className="w-full mt-1 p-2 rounded-lg bg-white/10 text-white border border-white/10"
                        onChange={(e) =>
                          handleDynamicChange(field.id, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {options.map((opt, i) => (
                          <option key={i}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {/* FILE */}
                    {type === "FILE" && (
                      <input
                        className="w-full mt-1 p-2 rounded-lg bg-white/10 text-white border border-white/10"
                        type="file"
                        onChange={(e) =>
                          handleFileChange(field.id, e.target.files[0])
                        }
                      />
                    )}

                    {/* EXCEL */}
                    {type === "EXCEL" && (
                      <input
                        className="w-full mt-1 p-2 rounded-lg bg-white/10 text-white border border-white/10"
                        type="file"
                        accept=".xlsx"
                        onChange={(e) =>
                          handleExcelChange(field.id, e.target.files[0])
                        }
                      />
                    )}

                    {/* ERROR */}
                    {errors[field.id] && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                );
              })}

            </div>
          </motion.div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold shadow-lg"
          >
            {submitting ? "Submitting..." : "Submit Registration"}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}