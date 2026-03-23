import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { updateField } from "../../services/eventService";

const EditFieldModal = ({ field, close, reload }) => {
  const [form, setForm] = useState({
    label: "",
    fieldType: "text",
    options: "",
    required: false,
  });

  useEffect(() => {
    if (field) {
      setForm({
        label: field.label || "",
        fieldType: field.fieldType || "text",
        options: field.options || "",
        required: field.required || false,
      });
    }
  }, [field]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const update = async () => {
    if (!field) return;

    try {
      await updateField(field.id, form);

      reload();
      close();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={close}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
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
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
          Edit Field
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
              Options
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
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 w-full sm:w-auto"
            onClick={update}
          >
            Update Field
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditFieldModal;
