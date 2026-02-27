package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Event;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.FormFieldRepository;
import com.example.demo.repository.RegistrationRepository;

@Service
public class EventService 
{
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private RegistrationRepository registrationRepository;
	
	@Autowired
	private FormFieldRepository formFieldRepository;
	
	public void saveEvent(Event event)
	{
		eventRepository.save(event);
	}
	
	public List<Event> getAllEvents()
	{
		return eventRepository.findAll();
	}

	public Event getEventById(Long eventId) {
	    return eventRepository.findById(eventId).orElse(null);
	}
	
	@Transactional
	public void deleteEvent(Long id) {

	    registrationRepository.deleteByEventId(id);
	    formFieldRepository.deleteByEventId(id);

	    eventRepository.deleteById(id);
	}
	
	public void updateEvent(Event updatedEvent) {

	    Event existingEvent = eventRepository.findById(updatedEvent.getId())
	            .orElseThrow(() -> new RuntimeException("Event not found"));

	    existingEvent.setName(updatedEvent.getName());
	    existingEvent.setDescription(updatedEvent.getDescription());
	    existingEvent.setDeadline(updatedEvent.getDeadline());
	    existingEvent.setActive(updatedEvent.getActive());

	    eventRepository.save(existingEvent);
	}
	
	public void toggleEventStatus(Long id) {

	    Event event = eventRepository.findById(id).orElse(null);

	    if (event == null) {
	        System.out.println("Event not found with id: " + id);
	        return;
	    }

	    // If active is null, treat as false
	    Boolean currentStatus = event.getActive();
	    if (currentStatus == null) {
	        currentStatus = false;
	    }

	    event.setActive(!currentStatus);

	    eventRepository.save(event);
	}
	
	public List<Event> getActiveEvents() {
	    return eventRepository.findByActiveTrue();
	}
}
