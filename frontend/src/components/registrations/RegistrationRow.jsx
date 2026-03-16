import axios from "axios"

const API = "http://localhost:8080/api/registrations"

const RegistrationRow = ({ reg, fields, reload, onSelect }) => {

const data = reg.dynamicData
? JSON.parse(reg.dynamicData)
: {}

const approve = async (id)=>{
await axios.put(`${API}/approve/${id}`)
reload()
}

const reject = async (id)=>{
await axios.put(`${API}/reject/${id}`)
reload()
}

return(

<tr
className="border-b border-border hover:bg-yellow-500/5 cursor-pointer"
onClick={()=>onSelect(reg)}
>

<td>SF-{reg.id}</td>

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

{reg.status==="PENDING" && (

<div className="flex gap-2">

<button
className="px-3 py-1 bg-green-500/20 text-green-400 rounded"
onClick={(e)=>{
e.stopPropagation()
approve(reg.id)
}}
>
Approve
</button>

<button
className="px-3 py-1 bg-red-500/20 text-red-400 rounded"
onClick={(e)=>{
e.stopPropagation()
reject(reg.id)
}}
>
Reject
</button>

</div>

)}

</td>

</tr>

)

}

export default RegistrationRow