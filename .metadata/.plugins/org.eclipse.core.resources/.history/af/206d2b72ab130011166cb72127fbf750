package com.example.demo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entity.Event;
import com.example.demo.entity.FormField;
import com.example.demo.service.EventService;
import com.example.demo.service.FormFieldService;

@Controller
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private EventService eventService;

	@Autowired
	private FormFieldService formFieldService;
	
	@GetMapping("/dashboard")
	public String dashboard(Model model)
	{
		model.addAttribute("totalEvents", eventService.getAllEvents().size());
		return "admin-dashboard";
	}
	
	@GetMapping("/create-event")
	public String showCreateEventPage( Model model)
	{
		
		model.addAttribute("event", new Event());
		return "create-event";
	}
	
	@PostMapping("/save-event")
	public String saveEvent(@ModelAttribute Event event)
	{
		
		eventService.saveEvent(event);
		return "redirect:/admin/events";
	}
	
	@GetMapping("/events")
	public String listEvents(Model model)
	{

		model.addAttribute("events", eventService.getAllEvents());
		return "event-list";
	}
	
	@GetMapping("/add-field/{eventId}")
	public String showFieldPage(@PathVariable Long eventId, Model model, HttpSession session)
	{
			
		model.addAttribute("eventId", eventId);
		model.addAttribute("field", new FormField());
		return "add-field";
	}
	
	@PostMapping("/save-field/{eventId}")
	public String saveField(@PathVariable Long eventId, @ModelAttribute FormField field)
	{
	    formFieldService.saveField(eventId, field);
	    return "redirect:/admin/fields/" + eventId;
	}
	
	@GetMapping("/fields/{eventId}")
	public String viewFields(@PathVariable Long eventId, Model model) {
	    Event event = eventService.getEventById(eventId);
	    List<FormField> fields = formFieldService.getFieldsByEvent(eventId);

	    model.addAttribute("event", event);
	    model.addAttribute("fields", fields);

	    return "field-list";
	}
	
	@GetMapping("/edit-field/{id}")
	public String editField(@PathVariable Long id, Model model) {

	    FormField field = formFieldService.getFieldById(id);
	    model.addAttribute("field", field);

	    return "edit-field";
	}
	
	@PostMapping("/update-field")
	public String updateField(@ModelAttribute FormField field) {

	    formFieldService.updateField(field);

	    return "redirect:/admin/fields/" + field.getEvent().getId();
	}
	
	@GetMapping("/delete-field/{id}")
	public String deleteField(@PathVariable Long id) {

	    FormField field = formFieldService.getFieldById(id);
	    Long eventId = field.getEvent().getId();

	    formFieldService.deleteField(id);

	    return "redirect:/admin/fields/" + eventId;
	}
	
	@GetMapping("/delete-event/{id}")
	public String deleteEvent(@PathVariable Long id) {

	    eventService.deleteEvent(id);

	    return "redirect:/admin/events";
	}
	
	@GetMapping("/edit-event/{id}")
	public String editEvent(@PathVariable Long id, Model model) {

	    Event event = eventService.getEventById(id);
	    model.addAttribute("event", event);

	    return "edit-event";
	}
	
	@PostMapping("/update-event")
	public String updateEvent(@ModelAttribute Event event) {

	    eventService.updateEvent(event);

	    return "redirect:/admin/events";
	}
	
	@GetMapping("/toggle-event/{id}")
	public String toggleEvent(@PathVariable Long id) {

	    eventService.toggleEventStatus(id);

	    return "redirect:/admin/events";
	}
	
	@GetMapping("/preview/{eventId}")
	public String previewEvent(@PathVariable Long eventId, Model model) {

	    Event event = eventService.getEventById(eventId);
	    List<FormField> fields = formFieldService.getFieldsByEvent(eventId);

	    model.addAttribute("event", event);
	    model.addAttribute("fields", fields);

	    return "preview-event";
	}
}
