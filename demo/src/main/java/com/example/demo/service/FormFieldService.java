package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Event;
import com.example.demo.entity.FormField;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.FormFieldRepository;

@Service
public class FormFieldService 
{
	@Autowired
	private FormFieldRepository formFieldRepository;
	
	@Autowired
	private EventRepository eventRepository;
	
	
	public void saveField(Long eventId, FormField field)
	{
		Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
		field.setEvent(event);
		formFieldRepository.save(field);
	}
	
	public List<FormField> getFieldsByEvent(Long eventId)
	{
		return formFieldRepository.findByEventId(eventId);
	}
	
	public FormField getFieldById(Long id) {
	    return formFieldRepository.findById(id).orElse(null);
	}

	public void updateField(FormField updatedField) {

		FormField existingField = formFieldRepository.findById(updatedField.getId())
				.orElseThrow(() -> new RuntimeException("Field not found"));

		existingField.setLabel(updatedField.getLabel());
		existingField.setFieldType(updatedField.getFieldType());
		existingField.setOptions(updatedField.getOptions());
		existingField.setRequired(updatedField.getRequired());

		formFieldRepository.save(existingField);
	}

	public void deleteField(Long id) {
	    formFieldRepository.deleteById(id);
	}
}
