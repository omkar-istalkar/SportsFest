package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.repository.EventRepository;
import com.example.demo.service.RegistrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationApiController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
private EventRepository eventRepository;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getRegistrationsByEvent(@PathVariable Long eventId) {
        return registrationService.getRegistrationsByEvent(eventId);
    }
    @PostMapping("/approve/{id}")
    public void approveRegistration(@PathVariable Long id) {
        registrationService.approveRegistration(id);
    }

    @PostMapping("/reject/{id}")
    public void rejectRegistration(@PathVariable Long id) {
        registrationService.rejectRegistration(id);
    }

@PostMapping("/submit-registration")
public Map<String, Object> submitRegistration(
        @RequestParam Long eventId,
        @RequestParam Map<String, String> formData,
        Registration registration) {

    Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

    registration.setEvent(event);

    // Convert form fields to JSON
    formData.remove("eventId");

    try {
        ObjectMapper mapper = new ObjectMapper();
        registration.setDynamicData(mapper.writeValueAsString(formData));
    } catch (JsonProcessingException e) {
        throw new RuntimeException("JSON conversion error", e);
    }
    Registration saved = registrationService.saveRegistration(registration);

    Map<String, Object> response = new HashMap<>();
    response.put("registrationId", saved.getRegistrationId());

    return response;
}
}