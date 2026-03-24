package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.RegistrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.multipart.MultipartFile;
import com.example.demo.entity.UploadedFile;
import com.example.demo.repository.UploadedFileRepository;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationApiController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UploadedFileRepository uploadedFileRepository;

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
            @RequestParam String data,
            @RequestParam(required = false) List<MultipartFile> files,
            @RequestParam(required = false) List<Long> fileFieldIds,
            Authentication authentication
    ) {

        Map<String, Object> response = new HashMap<>();

        try {

            // 1️⃣ Get logged user
            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2️⃣ Get event
            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            // 3️⃣ Convert JSON → Map
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> dataMap = mapper.readValue(data, Map.class);

            // 4️⃣ Create registration
            Registration registration = new Registration();
            registration.setUser(user);
            registration.setEvent(event);
            registration.setStatus(RegistrationStatus.PENDING);
            registration.setDynamicData(data);

            Registration saved = registrationService.saveRegistration(registration);

            // 5️⃣ Handle file upload
            if (files != null && fileFieldIds != null) {

                for (int i = 0; i < files.size(); i++) {

                    MultipartFile file = files.get(i);
                    Long fieldId = fileFieldIds.get(i);

                    if (!isValidType(file.getContentType())) {
                        throw new RuntimeException("Invalid file type");
                    }

                    UploadedFile upload = new UploadedFile();
                    upload.setRegistrationId(saved.getRegistrationId());
                    upload.setFieldId(fieldId);
                    upload.setFileName(file.getOriginalFilename());
                    upload.setFileType(file.getContentType());
                    upload.setData(file.getBytes());

                    UploadedFile savedFile = uploadedFileRepository.save(upload);

                    // 🔥 UPDATE JSON
                    Map<String, Object> fileObj = new HashMap<>();
                    fileObj.put("type", "file");
                    fileObj.put("fileId", savedFile.getId());

                    dataMap.put(String.valueOf(fieldId), fileObj);
                }
            }

            // 6️⃣ Save updated JSON
            saved.setDynamicData(mapper.writeValueAsString(dataMap));
            registrationService.saveRegistration(saved);

            // 7️⃣ Response
            response.put("registrationId", saved.getRegistrationId());

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Submission failed");
        }

        return response;
    }

    private boolean isValidType(String type) {
    return type.equals("image/jpeg") ||
           type.equals("image/png") ||
           type.equals("application/pdf") ||
           type.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
           type.equals("text/plain");
}

}