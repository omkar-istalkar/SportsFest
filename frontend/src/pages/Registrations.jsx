import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import Sidebar from "../components/dashboard/Sidebar"
import Header from "../components/dashboard/Header"
import { X } from "lucide-react"

const API = "http://localhost:8080/api"

const Registrations = () => {

const [registrations,setRegistrations] = useState([])
const [fields,setFields] = useState([])
const [loading,setLoading] = useState(true)
const [selected,setSelected] = useState(null)

const loadData = async () => {

try{

setLoading(true)

const resRegs = await axios.get(`${API}/registrations`,{withCredentials:true})
setRegistrations(resRegs.data)

}catch(err){

console.error("Failed loading registrations:",err)

}finally{

setLoading(false)

}

}

useEffect(()=>{
loadData()
},[])


// APPROVE
const approve = async (id) => {

try{

await axios.post(`${API}/registrations/approve/${id}`,{withCredentials:true})

alert("Registration approved")

loadData()

}catch(err){

console.error("Approve error:",err)

}

}


// REJECT
const reject = async (id) => {

try{

await axios.post(`${API}/registrations/reject/${id}`,{withCredentials:true})

alert("Registration rejected")

loadData()

}catch(err){

console.error("Reject error:",err)

}

}


// OPEN DETAILS
const openDetails = async(reg)=>{

setSelected(reg)

try{

const eventId = reg.event?.id

if(eventId){

const resFields = await axios.get(`${API}/fields/event/${eventId}`,{withCredentials:true})

// handle axios structure
if(Array.isArray(resFields.data)){
setFields(resFields.data)
}else if(resFields.data.data){
setFields(resFields.data.data)
}

}

}catch(err){

console.error("Failed loading fields:",err)

}

}

return(

<div className="flex bg-background min-h-screen">

<Sidebar/>

<div className="flex-1 ml-[220px]">

<Header title="Registrations" />

<div className="p-6">

<motion.h1
initial={{opacity:0,y:-10}}
animate={{opacity:1,y:0}}
className="text-xl font-semibold mb-6"
>
All Registrations
</motion.h1>


<div className="glass-card rounded-xl border border-border overflow-hidden">

{loading ? (

<div className="p-8 text-center text-muted-foreground">
Loading registrations...
</div>

) : (

<table className="w-full text-sm">

<thead className="border-b border-border/40 text-muted-foreground">

<tr>

<th className="p-4 text-left">ID</th>
<th className="text-left">Status</th>
<th className="text-left">Action</th>

</tr>

</thead>

<tbody>

{registrations.map((reg,i)=>{

return(

<motion.tr
key={reg.id}
initial={{opacity:0,y:8}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.05}}
className="border-b border-border/40 hover:bg-muted/10 transition"
>

<td className="p-4 font-medium">
REG-{reg.id}
</td>

<td>

<span className={`
px-3 py-1 text-xs rounded-full font-medium
${reg.status==="APPROVED" && "bg-green-500/20 text-green-400"}
${reg.status==="REJECTED" && "bg-red-500/20 text-red-400"}
${reg.status==="PENDING" && "bg-yellow-500/20 text-yellow-400"}
`}>
{reg.status}
</span>

</td>

<td>

{reg.status==="PENDING" ? (

<div className="flex gap-3">

<button
className="px-3 py-1 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
onClick={()=>approve(reg.id)}
>
Approve
</button>

<button
className="px-3 py-1 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
onClick={()=>reject(reg.id)}
>
Reject
</button>

</div>

) : (

<button
className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
onClick={()=>openDetails(reg)}
>
View Details
</button>

)}

</td>

</motion.tr>

)

})}

</tbody>

</table>

)}

</div>

</div>

</div>



{/* DETAILS MODAL */}

{selected && (

<div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">

<motion.div
initial={{scale:0.9,opacity:0}}
animate={{scale:1,opacity:1}}
className="
w-[600px]
rounded-2xl
border border-border
shadow-2xl
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
"
>

<div className="flex justify-between items-center px-6 py-4 border-b border-border">

<h2 className="text-lg font-semibold">
Registration Details
</h2>

<button onClick={()=>setSelected(null)}>
<X size={20}/>
</button>

</div>

<div className="p-6">

<div className="space-y-3 mb-6">

<p>
<span className="font-semibold">Registration ID:</span> REG-{selected.id}
</p>

<p>
<span className="font-semibold">Status:</span>{" "}
<span className="text-yellow-400">
{selected.status}
</span>
</p>

<p>
<span className="font-semibold">Registered At:</span>{" "}
{selected.registeredAt}
</p>

</div>

<hr className="border-border mb-4"/>

<h3 className="font-semibold mb-3">
Submitted Details
</h3>

<table className="w-full text-sm border border-border">

<tbody>

{fields.map(field=>{

const data = selected.dynamicData
? JSON.parse(selected.dynamicData)
: {}

return(

<tr key={field.id} className="border-b border-border">

<td className="px-4 py-2 font-medium w-[40%]">
{field.label}
</td>

<td className="px-4 py-2">
{data[field.id] || "-"}
</td>

</tr>

)

})}

</tbody>

</table>

</div>

</motion.div>

</div>

)}

</div>

)

}

export default Registrations