import RegistrationRow from "./RegistrationRow"

const RegistrationsTable = ({ registrations, fields, reload, onSelect }) => {

if(registrations.length===0){

return(

<div className="text-center text-muted-foreground py-6">
No registrations yet
</div>

)

}

return(

<table className="w-full text-sm">

<thead className="border-b border-border">

<tr>

<th>ID</th>

{fields.map(field=>(

<th key={field.id}>
{field.label}
</th>

))}

<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{registrations.map(reg=>(

<RegistrationRow
key={reg.id}
reg={reg}
fields={fields}
reload={reload}
onSelect={onSelect}
/>

))}

</tbody>

</table>

)

}

export default RegistrationsTable