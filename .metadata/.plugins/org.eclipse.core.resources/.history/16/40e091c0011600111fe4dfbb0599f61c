package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.TeamMember;
import com.example.demo.enums.EventType;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.TeamMemberRepository;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private EventRepository eventRepository;


    @Transactional
    public void registerParticipant(Long eventId,
                                    Registration registration,
                                    List<String> teamMembers) {

        // 1️⃣ Fetch Event
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // 2️⃣ Validate Event Active
        if (!event.getActive()) {
            throw new RuntimeException("Event is not active");
        }

        // 3️⃣ Validate Team Size (If Team Event)
        if (event.getEventType() == EventType.TEAM) {

            if (teamMembers == null || 
                teamMembers.size() != event.getTeamSize()) {

                throw new RuntimeException("Invalid team size");
            }
        }

        // 4️⃣ Set Auto Fields
        registration.setEvent(event);
        registration.setRegistrationId(generateRegistrationId());
        registration.setRegisteredAt(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.PENDING);

        // 5️⃣ Save Registration
        Registration savedRegistration = registrationRepository.save(registration);

        // 6️⃣ Save Team Members (Only for Team Event)
        if (event.getEventType() == EventType.TEAM) {

            for (String name : teamMembers) {

                TeamMember member = new TeamMember();
                member.setPlayerName(name);
                member.setRegistration(savedRegistration);

                teamMemberRepository.save(member);
            }
        }
    }
    
    private String generateRegistrationId() {
        long count = registrationRepository.count() + 1;
        return "SF-2026-" + String.format("%04d", count);
    }
    
    public Registration findByRegistrationId(String registrationId) {
        return registrationRepository.findByRegistrationId(registrationId);
    }
    
    @Transactional
    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    public Registration findById(Long id) {
        return registrationRepository.findById(id).orElse(null);
    }
    
    public List<Registration> getRegistrationsByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    @Transactional
    public void updateStatus(Long registrationId, RegistrationStatus status) {
        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        reg.setStatus(status);
        registrationRepository.save(reg);
    }
}