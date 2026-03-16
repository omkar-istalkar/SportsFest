import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function RegistrationSuccessPage(){

const { id } = useParams()
const navigate = useNavigate()

return(

<div className="flex items-center justify-center min-h-screen bg-background">

<motion.div
initial={{scale:0.9,opacity:0}}
animate={{scale:1,opacity:1}}
className="
w-[420px]
p-8
rounded-xl
border border-border
glass-card
text-center
"
>

<h1 className="text-xl font-semibold mb-4">
Registration Successful
</h1>

<p className="text-muted-foreground mb-6">
Your registration ID
</p>

<div className="text-2xl font-bold mb-6">
{id}
</div>

<div className="flex flex-col gap-3">

<button
onClick={()=>navigate("/registration-status")}
className="px-4 py-2 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
>
Check Registration Status
</button>

<button
onClick={()=>navigate("/events")}
className="px-4 py-2 rounded-md bg-muted/20 hover:bg-muted/30"
>
Back to Events
</button>

</div>

</motion.div>

</div>

)

}