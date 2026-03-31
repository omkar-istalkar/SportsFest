import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Pencil,
  Trash2,
  Eye,
  List,
  Users
} from "lucide-react"

import {
  getEvents,
  deleteEvent,
  toggleEvent
} from "../services/eventService"

import Sidebar from "../components/dashboard/Sidebar"
import Header from "../components/dashboard/Header"

import EventModal from "../components/events/EventModal"
import FieldsModal from "../components/events/FieldsModal"
import PreviewModal from "../components/events/PreviewModal"
import ResponsesModal from "../components/events/ResponsesModal"

const Events = () => {

  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const loadEvents = async () => {
    const res = await getEvents()
    console.log("EVENT RESPONSE:", res.data)
    setEvents(res.data)
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const confirmDeleteEvent = async () => {
    await deleteEvent(deleteId)
    setConfirmDelete(false)
    setDeleteId(null)
    loadEvents()
  }

  const total = events.length
  const active = events.filter(e => e.active).length
  const inactive = total - active

  return (

    <div className="flex bg-background min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-0 md:ml-[220px]">

        <Header title="Events" />

        <div className="p-4 sm:p-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6"
          >

            <h1 className="text-lg sm:text-xl font-semibold">
              All Events
            </h1>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md
              bg-blue-500/20 text-blue-400
              hover:bg-blue-500/30 transition text-sm"
              onClick={() => setModal("create")}
            >
              <Calendar size={16}/>
              Create Event
            </button>

          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

            <div className="glass-card p-4 rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">Total Events</p>
              <h2 className="text-lg sm:text-xl font-semibold">{total}</h2>
            </div>

            <div className="glass-card p-4 rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">Active Events</p>
              <h2 className="text-lg sm:text-xl font-semibold text-green-400">{active}</h2>
            </div>

            <div className="glass-card p-4 rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">Inactive Events</p>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-400">{inactive}</h2>
            </div>

          </div>

          {/* Table */}
          <div className="glass-card rounded-xl border border-border overflow-hidden">

            <div className="overflow-x-auto">

              <table className="min-w-[900px] w-full text-sm">

                <thead className="border-b border-border/40 text-muted-foreground">

                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Deadline</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Is it free</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {events.map((event, i) => (

                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/40 hover:bg-muted/10 transition-all"
                    >

                      <td className="p-4 whitespace-nowrap">{event.id}</td>

                      <td className="font-medium max-w-[200px] truncate">
                        {event.name}
                      </td>


                      <td className="whitespace-nowrap">{event.deadline}</td>

                      {/* Status */}
                      <td>

                        <div className="flex items-center gap-2 flex-wrap">

                          <span
                            className={`px-3 py-1 text-xs rounded-full
                            ${event.active
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {event.active ? "Active" : "Inactive"}
                          </span>

                          <input
                            type="checkbox"
                            checked={event.active}
                            onChange={() =>
                              toggleEvent(event.id).then(loadEvents)
                            }
                          />

                        </div>

                      </td>

                      <td className="font-medium max-w-[200px] truncate">
                        {event.isPaid ? "Paid": "Free"}
                      </td>

                      <td className="font-medium max-w-[200px] truncate">
                        {event.amount || 0}
                      </td>

                      {/* Actions */}
                      <td>

                        <div className="flex flex-wrap gap-2 py-2">

                          <button className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded"
                            onClick={()=>{setSelected(event); setModal("fields")}}>
                            Fields
                          </button>

                          <button className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded"
                            onClick={()=>{setSelected(event); setModal("edit")}}>
                            Edit
                          </button>

                          <button className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded"
                            onClick={()=>{setDeleteId(event.id); setConfirmDelete(true)}}>
                            Delete
                          </button>

                          <button className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded"
                            onClick={()=>{setSelected(event); setModal("preview")}}>
                            Preview
                          </button>

                          <button className="px-2 py-1 text-xs bg-gray-700 text-white rounded"
                            onClick={()=>{setSelected(event); setModal("responses")}}>
                            Responses
                          </button>

                        </div>

                      </td>

                    </motion.tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      {/* Modals */}
      {modal==="create" && <EventModal close={()=>setModal(null)} reload={loadEvents}/>}
      {modal==="edit" && <EventModal event={selected} close={()=>setModal(null)} reload={loadEvents}/>}
      {modal==="fields" && <FieldsModal event={selected} close={()=>setModal(null)}/>}
      {modal==="preview" && <PreviewModal event={selected} close={()=>setModal(null)}/>}
      {modal==="responses" && <ResponsesModal event={selected} close={()=>setModal(null)}/>}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-3">
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Delete Event</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete this event?
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={()=>setConfirmDelete(false)}>
                Cancel
              </button>

              <button className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={confirmDeleteEvent}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Events