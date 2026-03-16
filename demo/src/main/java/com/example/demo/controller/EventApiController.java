package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Event;
import com.example.demo.service.EventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventApiController {

    @Autowired
    private EventService eventService;

    // Get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // Get single event
    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Create event
    @PostMapping
    public void createEvent(@RequestBody Event event) {
         eventService.saveEvent(event);
    }

    // Update event
    @PutMapping("/{id}")
    public void updateEvent(@PathVariable Long id, @RequestBody Event event) {
        event.setId(id);
        eventService.updateEvent(event);
    }

    // Delete event
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    // Toggle event status
    @PutMapping("/toggle/{id}")
    public void toggleEvent(@PathVariable Long id) {
        eventService.toggleEventStatus(id);
    }
}