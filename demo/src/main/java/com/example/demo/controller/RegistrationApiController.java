package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Event;
import com.example.demo.entity.FormField;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.FormFieldRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.RegistrationService;
import com.example.demo.service.TransactionDataService;
import com.example.demo.service.ExcelService;
import com.example.demo.service.ReceiptService;
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

    @Autowired
    private FormFieldRepository fieldRepository;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private TransactionDataService tService;

    @Autowired
    private ReceiptService receiptService;
   
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
            @RequestParam(required = false) List<MultipartFile> excelFiles,
            @RequestParam(required = false) List<Long> excelFieldIds,
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
            @SuppressWarnings("unchecked")
            Map<String, Object> dataMap = mapper.readValue(data, Map.class);

            // 4️⃣ Create registration
            Registration registration = new Registration();
            registration.setUser(user);
            registration.setEvent(event);
            registration.setStatus(RegistrationStatus.PENDING);
            registration.setDynamicData(data);
            registration.setPublicUser(null);

            Registration saved = registrationService.saveRegistration(registration);

            // 5️⃣ Handle FILE upload (unchanged)
            if (files != null && fileFieldIds != null) {

                int size = Math.min(files.size(), fileFieldIds.size());

                for (int i = 0; i < size; i++) {

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

                    Map<String, Object> fileObj = new HashMap<>();
                    fileObj.put("type", "file");
                    fileObj.put("fileId", savedFile.getId());

                    dataMap.put(String.valueOf(fieldId), fileObj);
                }
            }

            // 🔥 6️⃣ HANDLE EXCEL FILES (FINAL SAFE VERSION)
            if (excelFiles != null && excelFieldIds != null) {

                int size = Math.min(excelFiles.size(), excelFieldIds.size());

                for (int i = 0; i < size; i++) {

                    MultipartFile excelFile = excelFiles.get(i);
                    Long fieldId = excelFieldIds.get(i);

                    // ✅ Validate empty
                    if (excelFile.isEmpty()) {
                        throw new RuntimeException("Excel file is empty");
                    }

                    // ✅ Validate extension
                    if (excelFile.getOriginalFilename() == null ||
                        !excelFile.getOriginalFilename().endsWith(".xlsx")) {
                        throw new RuntimeException("Only .xlsx files allowed");
                    }

                    // ✅ Validate field type
                    FormField field = fieldRepository.findById(fieldId).orElse(null);

                    if (field == null || field.getFieldType() == null ||
                        !field.getFieldType().equalsIgnoreCase("EXCEL")) {
                        continue;
                    }

                    // ✅ Process Excel
                    Long excelUploadId = excelService.process(
                            excelFile,
                            saved.getRegistrationId(),
                            fieldId
                    );

                    // ✅ Store structured JSON
                    Map<String, Object> excelObj = new HashMap<>();
                    excelObj.put("type", "excel");
                    excelObj.put("excelUploadId", excelUploadId);

                    dataMap.put(String.valueOf(fieldId), excelObj);
                }
            }

            // 7️⃣ Save updated JSON
            saved.setDynamicData(mapper.writeValueAsString(dataMap));
            registrationService.saveRegistration(saved);
            
            tService.SaveTransaction(saved.getRegistrationId());
            receiptService.generateReceipt(saved.getRegistrationId());


            // 8️⃣ Response
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