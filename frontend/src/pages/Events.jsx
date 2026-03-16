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

      <div className="flex-1 ml-[220px]">

        <Header title="Events" />

        <div className="p-6">

          {/* Header */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-6"
          >

            <h1 className="text-xl font-semibold">
              All Events
            </h1>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md
              bg-blue-500/20 text-blue-400
              hover:bg-blue-500/30 hover:scale-[1.03]
              transition"
              onClick={() => setModal("create")}
            >
              <Calendar size={16}/>
              Create Event
            </button>

          </motion.div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4 mb-6">

            <div className="glass-card p-4 rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">Total Events</p>
              <h2 className="text-xl font-semibold">{total}</h2>
            </div>

            <div className="glass-card p-4 rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">Active Events</p>
              <h2 className="text-xl font-semibold text-green-400">{active}</h2>
            </div>

            <div className="glass-card p-4 rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">Inactive Events</p>
              <h2 className="text-xl font-semibold text-gray-400">{inactive}</h2>
            </div>

          </div>

          {/* Table */}

          <div className="glass-card rounded-xl border border-border overflow-hidden">

            <table className="w-full text-sm">

              <thead className="border-b border-border/40 text-muted-foreground">

                <tr>

                  <th className="p-4 text-left">ID</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Deadline</th>
                  <th className="text-left">Status</th>
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
                    className="border-b border-border/40
                    hover:bg-muted/10
                    hover:ring-1 hover:ring-yellow-500/40
                    transition-all duration-200"
                  >

                    <td className="p-4">{event.id}</td>

                    <td className="font-medium">
                      {event.name}
                    </td>

                    <td>{event.deadline}</td>

                    {/* Status */}

                    <td>

                      <div className="flex items-center gap-3">

                        <span
                          className={`px-3 py-1 text-xs rounded-full
                          ${event.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {event.active ? "Active" : "Inactive"}
                        </span>

                        {/* Toggle */}

                        <label className="relative inline-flex items-center cursor-pointer">

                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={event.active}
                            onChange={() =>
                              toggleEvent(event.id).then(loadEvents)
                            }
                          />

                          <div
                            className="w-10 h-5 bg-gray-600 rounded-full
                            peer-checked:bg-green-500
                            after:content-['']
                            after:absolute after:top-[2px] after:left-[2px]
                            after:bg-white after:h-4 after:w-4
                            after:rounded-full after:transition-all
                            peer-checked:after:translate-x-5"
                          ></div>

                        </label>

                      </div>

                    </td>

                    {/* Actions */}

                    <td className="flex items-center gap-4 py-3">

                      <button
                        className="flex items-center gap-1 px-3 py-[6px] rounded-md
                        bg-cyan-500/20 text-cyan-400
                        hover:bg-cyan-500/30 hover:scale-[1.04]
                        transition"
                        onClick={()=>{
                          setSelected(event)
                          setModal("fields")
                        }}
                      >
                        <List size={14}/>
                        Fields
                      </button>

                      <button
                        className="flex items-center gap-1 px-3 py-[6px] rounded-md
                        bg-yellow-500/20 text-yellow-400
                        hover:bg-yellow-500/30 hover:scale-[1.04]
                        transition"
                        onClick={()=>{
                          setSelected(event)
                          setModal("edit")
                        }}
                      >
                        <Pencil size={14}/>
                        Edit
                      </button>

                      <button
                        className="flex items-center gap-1 px-3 py-[6px] rounded-md
                        bg-red-500/20 text-red-400
                        hover:bg-red-500/30 hover:scale-[1.04]
                        transition"
                        onClick={()=>{
                          setDeleteId(event.id)
                          setConfirmDelete(true)
                        }}
                      >
                        <Trash2 size={14}/>
                        Delete
                      </button>

                      <button
                        className="flex items-center gap-1 px-3 py-[6px] rounded-md
                        bg-blue-500/20 text-blue-400
                        hover:bg-blue-500/30 hover:scale-[1.04]
                        transition"
                        onClick={()=>{
                          setSelected(event)
                          setModal("preview")
                        }}
                      >
                        <Eye size={14}/>
                        Preview
                      </button>

                      <button
                        className="flex items-center gap-1 px-3 py-[6px] rounded-md
                        bg-gray-700 text-white
                        hover:bg-gray-600 hover:scale-[1.04]
                        transition"
                        onClick={()=>{
                          setSelected(event)
                          setModal("responses")
                        }}
                      >
                        <Users size={14}/>
                        Responses
                      </button>

                    </td>

                  </motion.tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Modals */}

      {modal==="create" &&
        <EventModal close={()=>setModal(null)} reload={loadEvents}/>
      }

      {modal==="edit" &&
        <EventModal event={selected} close={()=>setModal(null)} reload={loadEvents}/>
      }

      {modal==="fields" &&
        <FieldsModal event={selected} close={()=>setModal(null)}/>
      }

      {modal==="preview" &&
        <PreviewModal event={selected} close={()=>setModal(null)}/>
      }

      {modal==="responses" &&
        <ResponsesModal event={selected} close={()=>setModal(null)}/>
      }

      {/* Delete Confirmation */}

      {confirmDelete && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-card border border-border rounded-xl p-6 w-[360px]">

            <h2 className="text-lg font-semibold mb-2">
              Delete Event
            </h2>

            <p className="text-sm text-muted-foreground mb-5">
              Are you sure you want to delete this event?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                className="px-4 py-2 rounded-md bg-gray-600 text-white"
                onClick={()=>setConfirmDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-red-600 text-white"
                onClick={confirmDeleteEvent}
              >
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