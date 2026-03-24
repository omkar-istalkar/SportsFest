import { useState } from "react";
import { motion } from "framer-motion";
import { createField } from "../../services/eventService";

const AddFieldModal = ({ event, close, reload }) => {
  const [form, setForm] = useState({
    label: "",
    fieldType: "text",
    options: "",
    required: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveField = async () => {
    try {
      await createField(event.id, form);

      reload();
      close();
    } catch (err) {
      console.error("Error creating field:", err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={close}
      onMouseDown={(e)=>e.stopPropagation()}   // ✅ FIX
      >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e)=>e.stopPropagation()}  
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
w-full max-w-md
max-h-[90vh]
overflow-y-auto
p-4 sm:p-6
rounded-2xl
border border-border
shadow-2xl
bg-gradient-to-br
from-[#020617]
via-[#020617]
to-[#0f172a]
"
      >
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 truncate">
          Add Field - {event.name}
        </h2>

        {/* Label */}

        <div className="mb-4">
          <label className="text-sm text-muted-foreground mb-1 block">
            Field Label
          </label>

          <input
            name="label"
            value={form.label}
            onChange={handleChange}
            className="
w-full px-3 py-2 rounded-lg
bg-muted/30
border border-border
focus:outline-none
focus:ring-1 focus:ring-blue-500
"
            placeholder="Enter field label"
          />
        </div>

        {/* Field Type */}

        <div className="mb-4">
          <label className="text-sm text-muted-foreground mb-1 block">
            Field Type
          </label>

          <select
            name="fieldType"
            value={form.fieldType}
            onChange={handleChange}
            className="
w-full px-3 py-2 rounded-lg
bg-muted/30
border border-border
focus:outline-none
focus:ring-1 focus:ring-blue-500
"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="dropdown">Dropdown</option>
            <option value="radio">Radio</option>
          </select>
        </div>

        {/* Options */}

        {(form.fieldType === "dropdown" || form.fieldType === "radio") && (
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1 block">
              Options (comma separated)
            </label>

            <input
              name="options"
              value={form.options}
              onChange={handleChange}
              className="
w-full px-3 py-2 rounded-lg
bg-muted/30
border border-border
focus:outline-none
focus:ring-1 focus:ring-blue-500
"
              placeholder="Option1,Option2,Option3"
            />
          </div>
        )}

        {/* Required */}

        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <input
            type="checkbox"
            name="required"
            checked={form.required}
            onChange={handleChange}
          />

          <label className="text-sm">Required</label>
        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 w-full sm:w-auto"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 w-full sm:w-auto"
            onClick={saveField}
          >
            Save Field
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddFieldModal;
