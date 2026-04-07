import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { event, formData, files, excelFiles } = location.state || {};

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const amountToPay = Number(event?.amount);

        console.log("FINAL AMOUNT:", amountToPay);
      const res = await axios.post(
        `http://localhost:8080/api/razorpay/create-order?amount=${amountToPay}`,{withCredentials:true}
      );

      const order = res.data;

      const options = {
        key: "rzp_test_SaDaCKqE51bG72",
        amount: order.amount,
        currency: order.currency,
        name: event.name,
        description: "Event Registration",
        order_id: order.id,

        method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true
        },

        handler: async function (response) {
          try {
            // 2️⃣ Verify payment
            const verifyRes = await axios.post(
              "http://localhost:8080/api/razorpay/verify",
              response, {withCredentials: true}
            );

            if (verifyRes.data === "SUCCESS") {

                const data = new FormData();
                data.append("eventId", event.id);
                data.append("data", JSON.stringify(formData));

                Object.keys(files || {}).forEach((fieldId) => {
                    data.append("files", files[fieldId]);
                    data.append("fileFieldIds", fieldId);
                });

                Object.keys(excelFiles || {}).forEach((fieldId) => {
                    data.append("excelFiles", excelFiles[fieldId]);
                    data.append("excelFieldIds", fieldId);
                });


               const regRes = await axios.post(
                    "http://localhost:8080/api/registrations/submit-registration",
                    data,
                    { withCredentials: true }
                );

             const regId = regRes.data?.registrationId;

            navigate(`/registration-success/${regId}`, {
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
            setLoading(false);
            alert("Payment cancelled ❌");
          },
        },

        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!event) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center p-6">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg rounded-2xl border border-gray-700 bg-[#020617]/80 backdrop-blur-xl shadow-2xl p-8"
      >
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Complete Payment
        </h2>

        {/* Event Info */}
        <div className="text-center mb-6">
          <h3 className="text-xl text-white font-semibold">{event?.name}</h3>
          <p className="text-gray-400 text-sm mt-2">
            Secure payment powered by Razorpay
          </p>
        </div>

        {/* Amount Card */}
        <div className="bg-[#0f172a] rounded-xl p-6 mb-6 border border-gray-700 text-center">
          <p className="text-gray-400 text-sm">Amount to Pay</p>
          <h1 className="text-3xl font-bold text-green-400 mt-2">
            ₹{event?.amount}
          </h1>
        </div>

        {/* Pay Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </motion.button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 py-2 text-gray-400 hover:text-white transition"
        >
          ← Back
        </button>

      </motion.div>
    </div>
  );
}