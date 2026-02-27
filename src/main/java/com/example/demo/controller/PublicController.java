package com.example.demo.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.service.EventService;
import com.example.demo.service.RegistrationService;

@Controller
public class PublicController {

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/track")
    public String showTrackPage() {
        return "track-registration";
    }

    @PostMapping("/track")
    public String track(@RequestParam String registrationId, Model model) {

        Registration reg = registrationService.findByRegistrationId(registrationId);

        if (reg == null) {
            model.addAttribute("error", "Invalid Registration ID");
            return "track-registration";
        }

        model.addAttribute("registration", reg);
        return "registration-status";
    }
    
    @Autowired
    private EventService eventService;


    // 1️⃣ Show active events
    @GetMapping("/events")
    public String showEvents(Model model) {
        model.addAttribute("events", eventService.getActiveEvents());
        return "public-events";
    }

    // 2️⃣ Show registration form
    @GetMapping("/register/{eventId}")
    public String showRegistrationForm(@PathVariable Long eventId, Model model) {

        Event event = eventService.getEventById(eventId);
        model.addAttribute("event", event);
        model.addAttribute("registration", new Registration());

        return "registration-form";
    }

    // 3️⃣ Submit registration
    @PostMapping("/submit-registration")
    public String submitRegistration(@ModelAttribute Registration registration,
                                     @RequestParam Long eventId) {

        Event event = eventService.getEventById(eventId);

        registration.setEvent(event);
        registration.setRegisteredAt(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.PENDING);

        Registration saved = registrationService.saveRegistration(registration);

        return "redirect:/registration-success/" + saved.getId();
    }

    // 4️⃣ Success page
    @GetMapping("/registration-success/{id}")
    public String successPage(@PathVariable Long id, Model model) {
        model.addAttribute("registrationId", id);
        return "registration-success";
    }

    // 5️⃣ Check status page
    @GetMapping("/check-status")
    public String checkStatusPage() {
        return "check-status";
    }

    @PostMapping("/check-status")
    public String checkStatus(@RequestParam Long registrationId, Model model) {

        Registration reg = registrationService.findById(registrationId);

        model.addAttribute("registration", reg);

        return "check-status";
    }
}
