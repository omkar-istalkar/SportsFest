import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { createEvent, updateEvent } from "../../services/eventService"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const EventModal = ({ event, close, reload }) => {

  const modalRef = useRef()

  const [form, setForm] = useState({
    name: "",
    description: "",
    deadline: null,
    registrationType: "INDIVIDUAL",
    teamSize: 1,
    active: true,
    isPaid: false,
    amount: 0
  })

  useEffect(() => {
    if (event) {
      setForm({
        ...event,
        deadline: event.deadline ? new Date(event.deadline) : null
      })
    }
  }, [event])

const save = async () => {

  try {

    const payload = {
      ...form,
      deadline: form.deadline
        ? form.deadline.toISOString().split("T")[0]
        : null
    }

    console.log("Editing event:", event);
    console.log("Payload:", payload); // ✅ NOW CORRECT

    // Validation
    if (form.isPaid && (!form.amount || form.amount <= 0)) {
      alert("Please enter a valid amount for paid event");
      return;
    }

    if (event)
      await updateEvent(event.id, payload)
    else
      await createEvent(payload)

    reload()
    close()

  } catch (err) {
    console.error("Event save error:", err)
  }
}

  // ESC key close
  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [])

  // outside click close
  const handleOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close()
    }
  }

  return (

    <motion.div
      onMouseDown={handleOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
        w-full max-w-lg
        max-h-[90vh]
        overflow-y-auto
        p-4 sm:p-7
        rounded-2xl
        border border-border
        shadow-2xl
        bg-gradient-to-br
        from-[#0f172a]
        via-[#020617]
        to-[#020617]
        backdrop-blur-xl
        "
      >

        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
          {event ? "Edit Event" : "Create Event"}
        </h2>

        {/* Event Name */}
        <div className="mb-4 sm:mb-5">

          <label className="text-sm text-muted-foreground mb-1 block">
            Event Name
          </label>

          <input
            className="
            w-full px-3 py-2 rounded-lg
            bg-muted/30
            border border-border
            focus:outline-none
            focus:ring-1 focus:ring-yellow-500
            transition
            "
            placeholder="Enter event name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

        </div>

        {/* Description */}
        <div className="mb-4 sm:mb-5">

          <label className="text-sm text-muted-foreground mb-1 block">
            Description
          </label>

          <textarea
            rows="3"
            className="
            w-full px-3 py-2 rounded-lg
            bg-muted/30
            border border-border
            focus:outline-none
            focus:ring-1 focus:ring-yellow-500
            transition
            "
            placeholder="Event description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

        </div>

        {/* Deadline */}
        <div className="mb-4 sm:mb-5">

          <label className="text-sm text-muted-foreground mb-1 block">
            Deadline
          </label>

          <DatePicker
            selected={form.deadline}
            onChange={(date) =>
              setForm({ ...form, deadline: date })
            }
            dateFormat="dd-MM-yyyy"
            placeholderText="Select deadline"
            className="
            w-full px-3 py-2 rounded-lg
            bg-muted/30
            border border-border
            focus:outline-none
            focus:ring-1 focus:ring-yellow-500
            transition
            "
          />

        </div>

        {/* Registration Type */}
        <div className="mb-4 sm:mb-5">

          <label className="text-sm text-muted-foreground mb-1 block">
            Registration Type
          </label>

          <select
            className="
            w-full px-3 py-2 rounded-lg
            bg-muted/30
            border border-border
            focus:outline-none
            focus:ring-1 focus:ring-yellow-500
            transition
            "
            value={form.registrationType}
            onChange={(e) =>
              setForm({
                ...form,
                registrationType: e.target.value
              })
            }
          >

            <option value="INDIVIDUAL">Individual</option>
            <option value="TEAM">Team</option>

          </select>

        </div>

        {/* Team Size */}
        {form.registrationType === "TEAM" && (   // ✅ FIXED BUG

          <div className="mb-5 sm:mb-6">

            <label className="text-sm text-muted-foreground mb-1 block">
              Team Size
            </label>

            <input
              type="number"
              className="
              w-full px-3 py-2 rounded-lg
              bg-muted/30
              border border-border
              focus:outline-none
              focus:ring-1 focus:ring-yellow-500
              transition
              "
              value={form.teamSize}
              onChange={(e) =>
                setForm({
                  ...form,
                  teamSize: e.target.value
                })
              }
            />

          </div>

        )}

        {/* Payment Type */}
        <div className="mb-4 sm:mb-5">

          <label className="text-sm text-muted-foreground mb-2 block">
            Is Event Paid or Free?
          </label>

          <div className="flex gap-4">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!form.isPaid}
                onChange={() =>
                  setForm({ ...form, isPaid: false, amount: 0 })
                }
              />
              Free
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={form.isPaid}
                onChange={() =>
                  setForm({ ...form, isPaid: true })
                }
              />
              Paid
            </label>

          </div>

        </div>

        {/* Amount Field */}
        {form.isPaid && (

          <div className="mb-5 sm:mb-6">

            <label className="text-sm text-muted-foreground mb-1 block">
              Entry Fee (₹)
            </label>

            <input
              type="number"
              min="0"
              className="
              w-full px-3 py-2 rounded-lg
              bg-muted/30
              border border-border
              focus:outline-none
              focus:ring-1 focus:ring-yellow-500
              transition
              "
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: parseInt(e.target.value) || 0
                })
              }
            />

          </div>

        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">

          <button
            className="
            px-4 py-2 rounded-lg
            bg-gray-600/70
            text-white
            hover:bg-gray-500
            transition w-full sm:w-auto
            "
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="
            px-4 py-2 rounded-lg
            bg-blue-600
            text-white
            hover:bg-blue-500
            hover:scale-[1.02]
            transition w-full sm:w-auto
            "
            onClick={save}
          >
            Save Event
          </button>

        </div>

      </motion.div>

    </motion.div>
  )
}

export default EventModal