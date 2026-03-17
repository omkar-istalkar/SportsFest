import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

const API = "http://localhost:8080/api";

export default function RegistrationStatusPage() {

  const [regId,setRegId] = useState("");
  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);

  const checkStatus = async () => {

    try{

      setLoading(true);

      const numericId = regId.toUpperCase().replace("REG-","");

      const res = await axios.get(`${API}/registrations`,{withCredentials:true});

      const registration = res.data.find(
        r => r.id === Number(numericId)
      );

      if(!registration){
        alert("Registration not found");
        return;
      }

      setResult(registration);

    }catch(err){

      console.error("Failed fetching status:",err);

    }finally{

      setLoading(false);

    }

  };

  return (

    <div className="flex bg-background min-h-screen text-white">

      <Sidebar role="USER"/>

      <main className="flex-1 ml-[220px] p-8">

        <Header role="USER" name="User"/>

        {/* Page Header */}
        <div className="mb-10">

          <h1 className="text-3xl font-bold">
            Check Registration Status
          </h1>

          <p className="text-gray-400 mt-2">
            Enter your registration ID to check the approval status of your event application.
          </p>

        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Status Checker Card */}
          <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="
          bg-gradient-to-br
          from-slate-800/60
          to-slate-900/70
          backdrop-blur-xl
          border border-border
          rounded-2xl
          p-8
          shadow-xl
          "
          >

            <h2 className="text-xl font-semibold mb-6">
              Registration Lookup
            </h2>

            <input
            type="text"
            placeholder="Enter Registration ID (e.g. REG-1)"
            value={regId}
            onChange={(e)=>setRegId(e.target.value)}
            className="
            w-full
            border border-border
            rounded-md
            px-4
            py-3
            mb-4
            bg-transparent
            focus:border-blue-500
            transition
            "
            />

            <motion.button
            whileTap={{scale:0.95}}
            onClick={checkStatus}
            className="
            w-full
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            py-3
            rounded-lg
            font-semibold
            hover:from-blue-500
            hover:to-indigo-500
            transition
            "
            >

              {loading ? "Checking..." : "Check Status"}

            </motion.button>

            {result && (

              <motion.div
              initial={{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              className="mt-6 border-t border-border pt-4"
              >

                <p className="mb-3">
                  <span className="font-semibold">Registration ID:</span> REG-{result.id}
                </p>

                <p className="mb-3">
                  <span className="font-semibold">Event:</span> {result.event?.name}
                </p>

                <p>

                  <span className="font-semibold">Status:</span>{" "}

                  <span className={`
                  px-3 py-1 text-xs rounded-full font-medium
                  ${result.status==="APPROVED" && "bg-green-500/20 text-green-400"}
                  ${result.status==="REJECTED" && "bg-red-500/20 text-red-400"}
                  ${result.status==="PENDING" && "bg-yellow-500/20 text-yellow-400"}
                  `}>

                    {result.status}

                  </span>

                </p>

              </motion.div>

            )}

          </motion.div>


          {/* Help / Info Card */}
          <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.1}}
          className="
          bg-gradient-to-br
          from-slate-800/60
          to-slate-900/70
          backdrop-blur-xl
          border border-border
          rounded-2xl
          p-8
          shadow-xl
          "
          >

            <h2 className="text-xl font-semibold mb-4">
              How to find your Registration ID
            </h2>

            <ul className="space-y-3 text-gray-300 text-sm">

              <li>• After registering for an event you receive a Registration ID.</li>

              <li>• The ID format looks like <b>REG-1, REG-2, REG-10</b>.</li>

              <li>• Use this ID to track approval status.</li>

              <li>• Approved registrations allow you to participate in the event.</li>

            </ul>

            <div className="mt-6 p-4 bg-slate-900/40 rounded-lg text-sm text-gray-400">

              Tip: You can also view all your registrations in the
              <span className="text-blue-400 ml-1">Previous Applied Events</span> section.

            </div>

          </motion.div>

        </div>

      </main>

    </div>

  );

}