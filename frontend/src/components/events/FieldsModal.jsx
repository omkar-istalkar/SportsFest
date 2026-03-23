import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { getFields, deleteField } from "../../services/eventService"

import AddFieldModal from "./AddFieldModal"
import EditFieldModal from "./EditFieldModal"

const FieldsModal = ({ event, close }) => {

const modalRef = useRef()

const [fields,setFields] = useState([])
const [showAdd,setShowAdd] = useState(false)

const [showEdit,setShowEdit] = useState(false)
const [selectedField,setSelectedField] = useState(null)

const [confirmDelete,setConfirmDelete] = useState(false)
const [deleteId,setDeleteId] = useState(null)

const loadFields = async () => {
  try{
    const res = await getFields(event.id)
    setFields(res.data)
  }catch(err){
    console.error("Failed loading fields",err)
  }
}

useEffect(()=>{
  if(event?.id){
    loadFields()
  }
},[event])

const confirmDeleteField = async () => {
  try{
    await deleteField(deleteId)
    setConfirmDelete(false)
    setDeleteId(null)
    loadFields()
  }catch(err){
    console.error("Delete failed:",err)
  }
}

useEffect(()=>{
const esc = (e)=>{
if(e.key==="Escape") close()
}
window.addEventListener("keydown",esc)
return ()=>window.removeEventListener("keydown",esc)
},[])

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
initial={{scale:0.9,y:20,opacity:0}}
animate={{scale:1,y:0,opacity:1}}
transition={{duration:0.25}}
className="
w-full max-w-5xl
max-h-[90vh]
overflow-y-auto
p-4 sm:p-7
rounded-2xl
border border-border
shadow-2xl
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
backdrop-blur-xl
"
>

{/* Header */}

<div className="flex flex-wrap justify-between items-center gap-3 mb-6 sm:mb-8">

<h2 className="text-base sm:text-lg font-semibold truncate">
Fields — {event.name}
</h2>

<button
className="
flex items-center gap-2
px-3 sm:px-4 py-2 rounded-md
bg-blue-500/20 text-blue-400
hover:bg-blue-500/30
transition text-sm
"
onClick={()=>setShowAdd(true)}
>
+ Add Field
</button>

</div>

{/* Table Wrapper */}
<div className="overflow-x-auto">

<table className="min-w-[700px] w-full text-sm">

<thead className="border-b border-border/40 text-muted-foreground">

<tr>
<th className="py-3 sm:py-4 text-left">Label</th>
<th className="text-left">Type</th>
<th className="text-left">Required</th>
<th className="text-left">Options</th>
<th className="text-left">Action</th>
</tr>

</thead>

<tbody>

{fields.length===0 && (
<tr>
<td colSpan="5" className="py-6 sm:py-8 text-center text-muted-foreground">
No fields added yet
</td>
</tr>
)}

{fields.map((f,i)=>(

<motion.tr
key={f.id}
initial={{opacity:0,y:6}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.05}}
className="
border-b border-border/40
hover:bg-yellow-500/5
hover:border-yellow-500/30
transition-all duration-200
"
>

<td className="py-4 sm:py-5 font-medium max-w-[200px] truncate">
{f.label}
</td>

<td className="py-4 sm:py-5">
<span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 capitalize whitespace-nowrap">
{f.fieldType || f.type || f.field_type || "-"}
</span>
</td>

<td className="py-4 sm:py-5">
<span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[60px]
${f.required
? "bg-green-500/20 text-green-400"
: "bg-gray-500/20 text-gray-400"
}`}>
{f.required ? "Yes" : "No"}
</span>
</td>

<td className="py-4 sm:py-5 text-muted-foreground max-w-[250px] truncate">
{f.options || "-"}
</td>

<td className="py-4 sm:py-5">

<div className="flex flex-wrap items-center gap-2 sm:gap-3">

<button
className="px-3 py-1 rounded-md bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-xs sm:text-sm"
onClick={()=>{
setSelectedField(f)
setShowEdit(true)
}}
>
Edit
</button>

<button
className="px-3 py-1 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs sm:text-sm"
onClick={()=>{
setDeleteId(f.id)
setConfirmDelete(true)
}}
>
Delete
</button>

</div>

</td>

</motion.tr>

))}

</tbody>

</table>

</div>

{/* Footer */}

<div className="flex justify-end mt-6 sm:mt-8">

<button
className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition w-full sm:w-auto"
onClick={close}
>
Close
</button>

</div>

</motion.div>

{/* Add Field Modal */}
{showAdd && (
<AddFieldModal event={event} reload={loadFields} close={()=>setShowAdd(false)} />
)}

{/* Edit Field Modal */}
{showEdit && (
<EditFieldModal field={selectedField} reload={loadFields} close={()=>{
setShowEdit(false)
setSelectedField(null)
}} />
)}

{/* Delete Confirmation */}
{confirmDelete && (

<motion.div
className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60] p-3"
initial={{opacity:0}}
animate={{opacity:1}}
onMouseDown={()=>setConfirmDelete(false)}
>

<motion.div
onMouseDown={(e)=>e.stopPropagation()}
initial={{scale:0.9}}
animate={{scale:1}}
className="
w-full max-w-sm
bg-gradient-to-br
from-[#020617]
to-[#0f172a]
border border-border
rounded-xl
p-4 sm:p-6
shadow-xl
"
>

<h2 className="text-base sm:text-lg font-semibold mb-2">
Delete Field
</h2>

<p className="text-sm text-muted-foreground mb-5 sm:mb-6">
Are you sure you want to delete this field?
This action cannot be undone.
</p>

<div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">

<button
className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 w-full sm:w-auto"
onClick={()=>setConfirmDelete(false)}
>
Cancel
</button>

<button
className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 w-full sm:w-auto"
onClick={confirmDeleteField}
>
Delete
</button>

</div>

</motion.div>

</motion.div>

)}

</motion.div>

)

}

export default FieldsModal