package com.example.demo.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.enums.RegistrationType;
import com.example.demo.service.EventService;
import com.example.demo.service.RegistrationService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardApiController {

    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    private int getPriority(LocalDate deadline, LocalDate today) {

        if (deadline.isBefore(today)) {
            return 3; // expired
        }

        long days = ChronoUnit.DAYS.between(today, deadline);

        if (days <= 2) {
            return 1; // urgent
        }

        return 2; // upcoming
    }

    /*
     * =============================
     * DASHBOARD STATS
     * =============================
     */
    @GetMapping("/stats")
    public Map<String, Object> stats() {

        Map<String, Object> map = new HashMap<>();

        map.put("totalEvents", eventService.getAllEvents().size());
        map.put("activeEvents", eventService.getActiveEvents().size());
        map.put("registrations", registrationService.getAllRegistrations().size());

        return map;
    }

    /*
     * =============================
     * RECENT EVENTS
     * =============================
     */
    @GetMapping("/recent-events")
    public List<Event> recentEvents() {

        return eventService.getAllEvents()
                .stream()
                .sorted(Comparator.comparing(Event::getId).reversed())
                .limit(4)
                .collect(Collectors.toList());
    }

    /*
     * =============================
     * UPCOMING DEADLINES
     * =============================
     */
    @GetMapping("/upcoming-deadlines")
    public List<Event> upcomingDeadlines() {

        LocalDate today = LocalDate.now();

        return eventService.getAllEvents()
                .stream()
                .filter(e -> e.getDeadline() != null)

                // sort by priority then date
                .sorted((e1, e2) -> {

                    int p1 = getPriority(e1.getDeadline(), today);
                    int p2 = getPriority(e2.getDeadline(), today);

                    if (p1 != p2) {
                        return Integer.compare(p1, p2);
                    }

                    return e1.getDeadline().compareTo(e2.getDeadline());
                })

                .limit(3)
                .collect(Collectors.toList());
    }

    /*
     * =============================
     * PENDING APPROVALS
     * =============================
     */
    @GetMapping("/pending")
    public List<Registration> pendingApprovals() {

        return registrationService
                .getRegistrationsByStatus(RegistrationStatus.PENDING)
                .stream()
                .limit(3)
                .collect(Collectors.toList());
    }

    /*
     * =============================
     * EVENT TYPES (TEAM vs INDIVIDUAL)
     * =============================
     */
    @GetMapping("/event-types")
    public Map<String, Integer> eventTypes() {

        List<Event> events = eventService.getAllEvents();

        int team = (int) events.stream()
                .filter(e -> e.getRegistrationType() == RegistrationType.TEAM)
                .count();

        int individual = (int) events.stream()
                .filter(e -> e.getRegistrationType() == RegistrationType.INDIVIDUAL)
                .count();

        Map<String, Integer> map = new HashMap<>();

        map.put("team", team);
        map.put("individual", individual);

        return map;
    }

    /*
     * =============================
     * REGISTRATION TREND
     * =============================
     */
    @GetMapping("/registration-trend")
    public List<Map<String, Object>> registrationTrend() {

        List<Registration> registrations = registrationService.getAllRegistrations();

        Map<LocalDate, Long> grouped = registrations.stream()
                .collect(Collectors.groupingBy(
                    r -> r.getRegisteredAt() != null 
                        ? r.getRegisteredAt().toLocalDate()
                        : LocalDate.now(),
                        Collectors.counting()));

        List<Map<String, Object>> result = new ArrayList<>();

        for (Map.Entry<LocalDate, Long> entry : grouped.entrySet()) {

            Map<String, Object> map = new HashMap<>();

            map.put("date", entry.getKey());
            map.put("count", entry.getValue());

            result.add(map);
        }

        result.sort(Comparator.comparing(m -> (LocalDate) m.get("date")));

        return result;
    }
}