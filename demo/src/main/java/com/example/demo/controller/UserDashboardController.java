package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/user/dashboard")
public class UserDashboardController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private UserRepository userRepository;

    // Dashboard stats
    @GetMapping("/stats")
    public Map<String, Object> getUserDashboardStats(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long userId = user.getId();

        Map<String, Object> stats = new HashMap<>();

        long totalEvents = eventRepository.count();

        long registeredEvents =
                registrationRepository.countByUser_Id(userId);

        long completedEvents =
                registrationRepository.countByUser_IdAndStatus(
                        userId,
                        RegistrationStatus.APPROVED
                );

        long activeEvents = eventRepository.findByActiveTrue().size();

        stats.put("totalEvents", totalEvents);
        stats.put("registeredEvents", registeredEvents);
        stats.put("completedEvents", completedEvents);
        stats.put("activeEvents", activeEvents);

        return stats;
    }

    // User registrations
    @GetMapping("/registrations")
    public List<Registration> getUserRegistrations(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long userId = user.getId();

        return registrationRepository.findByUser_Id(userId);
    }
}