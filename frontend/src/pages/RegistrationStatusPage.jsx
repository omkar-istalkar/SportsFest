import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:8080/api";

export default function RegistrationStatusPage(){

const [regId,setRegId] = useState("")
const [result,setResult] = useState(null)
const [loading,setLoading] = useState(false)

const checkStatus = async () => {

try{

setLoading(true)

const numericId = regId.toUpperCase().replace("REG-","")

const res = await axios.get(`${API}/registrations`, {withCredentials:true})

const registration = res.data.find(r => r.id === Number(numericId))

if(!registration){
alert("Registration not found")
return
}

setResult(registration)

}catch(err){

console.error("Failed fetching status:",err)

}finally{

setLoading(false)

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-background">

<motion.div
initial={{scale:0.9,opacity:0}}
animate={{scale:1,opacity:1}}
className="glass-card border border-border p-8 rounded-xl w-[420px]"
>

<h1 className="text-xl font-semibold mb-6 text-center">
Check Registration Status
</h1>

<input
type="text"
placeholder="Enter Registration ID (e.g. 23)"
value={regId}
onChange={(e)=>setRegId(e.target.value)}
className="w-full border border-border rounded-md px-3 py-2 mb-4 bg-transparent"
/>

<button
onClick={checkStatus}
className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
>
{loading ? "Checking..." : "Check Status"}
</button>

{result && (

<div className="mt-6 border-t border-border pt-4">

<p className="mb-2">
<span className="font-semibold">Registration ID:</span> REG-{result.id}
</p>

<p className="mb-2">
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

</div>

)}

</motion.div>

</div>

)

}