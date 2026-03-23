import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { getFields } from "../../services/eventService"
import { X } from "lucide-react"

const PreviewModal = ({ event, close }) => {

const modalRef = useRef()

const [fields,setFields] = useState([])

useEffect(()=>{
getFields(event.id).then(res=>setFields(res.data))
},[event.id])

const handleOutside=(e)=>{
if(modalRef.current && !modalRef.current.contains(e.target)){
close()
}
}

return(

<motion.div
onMouseDown={handleOutside}
className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4"
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
w-full max-w-xl
max-h-[90vh]
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

{/* Header */}

<div className="flex flex-wrap justify-between items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-border">

<h2 className="text-base sm:text-lg font-semibold truncate">
Preview — {event.name}
</h2>

<button onClick={close}>
<X size={20}/>
</button>

</div>

{/* Event Info */}

<div className="px-4 sm:px-6 py-3 sm:py-4 space-y-1">

<h3 className="text-sm sm:text-base font-semibold truncate">
{event.name}
</h3>

<p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
{event.description}
</p>

<p className="text-xs sm:text-sm text-muted-foreground">
Deadline: {event.deadline}
</p>

</div>

{/* Form Card */}

<div className="mx-3 sm:mx-6 mb-4 sm:mb-6 p-4 sm:p-6 rounded-xl bg-muted/10 border border-border">

<form className="space-y-4 sm:space-y-5">

{fields.map(field=>(

<div key={field.id}>

<label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium">

{field.label}

{field.required && (
<span className="text-red-400 ml-1">*</span>
)}

</label>

{/* TEXT */}
{field.fieldType==="text" && (
<input
className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
/>
)}

{/* NUMBER */}
{field.fieldType==="number" && (
<input
type="number"
className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
/>
)}

{/* DROPDOWN */}
{field.fieldType==="dropdown" && (
<select
className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
>
<option>Select option</option>
{field.options?.split(",").map(o=>(
<option key={o}>{o.trim()}</option>
))}
</select>
)}

{/* RADIO */}
{field.fieldType==="radio" && (
<div className="flex flex-col gap-2">
{field.options?.split(",").map(o=>(
<label key={o} className="flex items-center gap-2 text-sm">
<input type="radio" name={field.id}/>
{o.trim()}
</label>
))}
</div>
)}

</div>

))}

{/* Buttons */}

<div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">

<button
type="button"
className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 w-full sm:w-auto"
onClick={close}
>
Close
</button>

<button
type="button"
className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 w-full sm:w-auto"
>
Submit (Preview Mode)
</button>

</div>

</form>

</div>

</motion.div>

</motion.div>

)

}

export default PreviewModal