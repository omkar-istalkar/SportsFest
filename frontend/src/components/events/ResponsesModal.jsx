import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  getResponses,
  getFields
} from "../../services/eventService"
import { X } from "lucide-react"

const ResponsesModal = ({ event, close }) => {

const modalRef = useRef()

const [registrations,setRegistrations] = useState([])
const [fields,setFields] = useState([])

const loadData = async () => {

const resFields = await getFields(event.id)
setFields(resFields.data)

const resRegs = await getResponses(event.id)
setRegistrations(resRegs.data)

}

useEffect(()=>{
loadData()
},[event.id])

const handleOutside=(e)=>{
if(modalRef.current && !modalRef.current.contains(e.target)){
close()
}
}
const approveReg = async(id)=>{

await fetch(`http://localhost:8080/api/registrations/approve/${id}`,{
method:"POST"
})

loadData()

}

const rejectReg = async(id)=>{

await fetch(`http://localhost:8080/api/registrations/reject/${id}`,{
method:"POST"
})

loadData()

}

return(

<motion.div
onMouseDown={handleOutside}
className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
initial={{opacity:0}}
animate={{opacity:1}}
>

<motion.div
ref={modalRef}
onMouseDown={(e)=>e.stopPropagation()}
initial={{scale:0.9,y:20,opacity:0}}
animate={{scale:1,y:0,opacity:1}}
transition={{duration:0.25}}
className="
w-[950px]
max-h-[85vh]
overflow-y-auto
rounded-2xl
border border-border
shadow-2xl
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
"
>

{/* HEADER */}

<div className="flex justify-between items-center px-6 py-4 border-b border-border">

<h2 className="text-lg font-semibold">
Registrations — {event.name}
</h2>

<button onClick={close}>
<X size={20}/>
</button>

</div>

<div className="p-6">

{/* EMPTY STATE */}

{registrations.length===0 && (

<div className="text-center text-muted-foreground py-6">
No registrations yet
</div>

)}

{/* TABLE */}

{registrations.length>0 && (

<table className="w-full text-sm">

<thead className="border-b border-border/40 text-muted-foreground">

<tr>

<th className="py-3 text-left">ID</th>

{/* Dynamic Headers */}

{fields.map(field=>(

<th key={field.id} className="text-left">
{field.label}
</th>

))}

<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{registrations.map((reg,i)=>{

const data = reg.dynamicData
  ? JSON.parse(reg.dynamicData)
  : {}

return(

<motion.tr
key={reg.id}
initial={{opacity:0,y:6}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.05}}
className="border-b border-border/40 hover:bg-yellow-500/5"
>

<td className="py-4">{reg.registrationId}</td>

{/* Dynamic Fields */}

{fields.map(field=>(

<td key={field.id}>
{data[field.id] || "-"}
</td>

))}

<td>

<span className={`
px-3 py-1 text-xs rounded-full
${reg.status==="APPROVED" && "bg-green-500/20 text-green-400"}
${reg.status==="REJECTED" && "bg-red-500/20 text-red-400"}
${reg.status==="PENDING" && "bg-yellow-500/20 text-yellow-400"}
`}>
{reg.status}
</span>

</td>

<td>

{reg.status === "PENDING" && (

<div className="flex gap-2">

<button
className="px-3 py-1 rounded-md bg-green-500/20 text-green-400"
onClick={()=>approveReg(reg.id)}
>
Approve
</button>

<button
className="px-3 py-1 rounded-md bg-red-500/20 text-red-400"
onClick={()=>rejectReg(reg.id)}
>
Reject
</button>

</div>

)}
</td>

</motion.tr>

)
})}

</tbody>

</table>

)}

{/* FOOTER */}

<div className="flex justify-end mt-6">

<button
className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500"
onClick={close}
>
Back
</button>

</div>

</div>

</motion.div>

</motion.div>

)

}

export default ResponsesModal