import { motion } from "framer-motion"
import { X } from "lucide-react"

const RegistrationDetailsModal = ({registration,fields,close})=>{

const data = registration.dynamicData
? JSON.parse(registration.dynamicData)
: {}

return(

<motion.div
className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
initial={{opacity:0}}
animate={{opacity:1}}
>

<motion.div
initial={{scale:0.9,y:20}}
animate={{scale:1,y:0}}
className="
w-[650px]
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
Registration Details
</h2>

<button onClick={close}>
<X size={20}/>
</button>

</div>

<div className="p-6">

<div className="space-y-2 mb-6">

<p>
<span className="font-semibold">Registration ID:</span>
{" "}SF-{registration.id}
</p>

<p>
<span className="font-semibold">Status:</span>
{" "}

<span className={`
px-2 py-1 text-xs rounded-full
${registration.status==="APPROVED" && "bg-green-500/20 text-green-400"}
${registration.status==="REJECTED" && "bg-red-500/20 text-red-400"}
${registration.status==="PENDING" && "bg-yellow-500/20 text-yellow-400"}
`}>
{registration.status}
</span>

</p>

<p>
<span className="font-semibold">Registered At:</span>
{" "}
{registration.registeredAt}
</p>

</div>

<hr className="border-border mb-4"/>

<h3 className="font-semibold mb-3">
Submitted Details
</h3>

<table className="w-full text-sm border border-border">

<tbody>

{fields.map(field=>(

<tr key={field.id} className="border-b border-border">

<td className="px-4 py-2 font-medium w-[40%]">
{field.label}
</td>

<td className="px-4 py-2">
{data[field.id] || "-"}
</td>

</tr>

))}

</tbody>

</table>

</div>

</motion.div>

</motion.div>

)

}

export default RegistrationDetailsModal