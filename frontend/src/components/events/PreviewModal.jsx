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
w-[600px]
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

{/* Header */}

<div className="flex justify-between items-center px-6 py-4 border-b border-border">

<h2 className="text-lg font-semibold">
Preview — {event.name}
</h2>

<button onClick={close}>
<X size={20}/>
</button>

</div>

{/* Event Info */}

<div className="px-6 py-4 space-y-1">

<h3 className="text-base font-semibold">
{event.name}
</h3>

<p className="text-sm text-muted-foreground">
{event.description}
</p>

<p className="text-sm text-muted-foreground">
Deadline: {event.deadline}
</p>

</div>

{/* Form Card */}

<div className="mx-6 mb-6 p-6 rounded-xl bg-muted/10 border border-border">

<form className="space-y-5">

{fields.map(field=>(

<div key={field.id}>

<label className="block mb-2 text-sm font-medium">

{field.label}

{field.required && (
<span className="text-red-400 ml-1">*</span>
)}

</label>

{/* TEXT */}

{field.fieldType==="text" && (

<input
className="
w-full px-3 py-2 rounded-lg
bg-muted/30 border border-border
focus:outline-none focus:ring-1 focus:ring-yellow-500
transition
"
/>

)}

{/* NUMBER */}

{field.fieldType==="number" && (

<input
type="number"
className="
w-full px-3 py-2 rounded-lg
bg-muted/30 border border-border
focus:outline-none focus:ring-1 focus:ring-yellow-500
transition
"
/>

)}

{/* DROPDOWN */}

{field.fieldType==="dropdown" && (

<select
className="
w-full px-3 py-2 rounded-lg
bg-muted/30 border border-border
focus:outline-none focus:ring-1 focus:ring-yellow-500
transition
"
>

<option>Select option</option>

{field.options?.split(",").map(o=>(

<option key={o}>
{o.trim()}
</option>

))}

</select>

)}

{/* RADIO */}

{field.fieldType==="radio" && (

<div className="flex flex-col gap-2">

{field.options?.split(",").map(o=>(

<label key={o} className="flex items-center gap-2">

<input type="radio" name={field.id}/>

{o.trim()}

</label>

))}

</div>

)}

</div>

))}

{/* Buttons */}

<div className="flex justify-end gap-3 pt-4">

<button
type="button"
className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500"
onClick={close}
>
Close
</button>

<button
type="button"
className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500"
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