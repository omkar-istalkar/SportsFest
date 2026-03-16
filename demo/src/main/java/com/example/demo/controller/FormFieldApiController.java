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

    @GetMapping("/event/{eventId}")
    public List<FormField> getFields(@PathVariable Long eventId) {
        return formFieldService.getFieldsByEvent(eventId);
    }

    @PostMapping("/event/{eventId}")
    public void addField(@PathVariable Long eventId, @RequestBody FormField field) {
        formFieldService.saveField(eventId, field);
    }

    @PutMapping("/{id}")
    public void updateField(@PathVariable Long id, @RequestBody FormField field) {

        
    field.setId(id);

    formFieldService.updateField(field);

    }

    @DeleteMapping("/{id}")
    public void deleteField(@PathVariable Long id) {
        formFieldService.deleteField(id);
    }
}