package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.FormField;
import com.example.demo.service.FormFieldService;

@RestController
@RequestMapping("/api/fields")
@CrossOrigin(origins = "http://localhost:5173")
public class FormFieldApiController {

    @Autowired
    private FormFieldService formFieldService;

    // ✅ GET fields
    @GetMapping("/event/{eventId}")
    public List<FormField> getFields(@PathVariable Long eventId) {
        return formFieldService.getFieldsByEvent(eventId);
    }

    // ✅ ADD FIELD (MODIFIED)
    @PostMapping("/event/{eventId}")
    public void addField(@PathVariable Long eventId, @RequestBody FormField field) {

        // ✅ Validate field type
        if (!isValidFieldType(field.getFieldType())) {
            throw new RuntimeException("Invalid field type");
        }

        // ✅ Handle options properly
        if (field.getFieldType().equals("dropdown") ||
            field.getFieldType().equals("radio")) {

            if (field.getOptions() == null || field.getOptions().isEmpty()) {
                throw new RuntimeException("Options required for dropdown/radio");
            }

        } else {
            // ✅ For text, number, file → remove options
            field.setOptions(null);
        }

        formFieldService.saveField(eventId, field);
    }

    // ✅ UPDATE FIELD (MODIFIED)
    @PutMapping("/{id}")
    public void updateField(@PathVariable Long id, @RequestBody FormField field) {

        field.setId(id);

        // ✅ Validate type
        if (!isValidFieldType(field.getFieldType())) {
            throw new RuntimeException("Invalid field type");
        }

        // ✅ Handle options
        if (field.getFieldType().equals("dropdown") ||
            field.getFieldType().equals("radio")) {

            if (field.getOptions() == null || field.getOptions().isEmpty()) {
                throw new RuntimeException("Options required");
            }

        } else {
            field.setOptions(null);
        }

        formFieldService.updateField(field);
    }

    // ✅ DELETE FIELD
    @DeleteMapping("/{id}")
    public void deleteField(@PathVariable Long id) {
        formFieldService.deleteField(id);
    }

    // 🔥 VALID FIELD TYPES (INCLUDING FILE)
    private boolean isValidFieldType(String type) {
        return type.equals("text") ||
               type.equals("number") ||
               type.equals("dropdown") ||
               type.equals("radio") ||
               type.equals("file"); // ✅ NEW
    }
}