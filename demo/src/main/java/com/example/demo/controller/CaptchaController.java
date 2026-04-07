package com.example.demo.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Event;
import com.example.demo.entity.FormField;
import com.example.demo.entity.PublicUsers;
import com.example.demo.entity.Registration;
import com.example.demo.entity.UploadedFile;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.FormFieldRepository;
import com.example.demo.repository.PublicUserRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UploadedFileRepository;
import com.example.demo.service.CaptchaService;
import com.example.demo.service.ExcelService;
import com.example.demo.service.FormFieldService;
import com.example.demo.service.ReceiptService;
import com.example.demo.service.RegistrationService;
import com.example.demo.service.TransactionDataService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/global-events/")
public class CaptchaController 
{
    @Autowired
    private CaptchaService captchaService;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private FormFieldService fieldService;

    @Autowired
    private PublicUserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

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

    @Autowired
    private RegistrationRepository repository;

    @GetMapping("/generate-captcha")
    public Map<String, String> generateCaptcha(
        @RequestParam Long eventId,
        HttpSession session
    )
    {
        String captcha = captchaService.generateCaptcha(4);
        session.setAttribute("captcha", captcha);
        session.setAttribute("eventId", eventId);
        session.setAttribute("captchaTime", Instant.now());
        session.setAttribute("verified", false);

        Map<String, String> response = new HashMap<>();
        response.put("captcha", captcha);
        return response;
    }

    @PostMapping("/verify-captcha")
    public boolean verifyCaptcha(
        @RequestParam String captcha, HttpSession session
    )
    {
        Boolean result = captchaService.validCaptcha(captcha, (String)session.getAttribute("captcha"));
        if(result){
            return true;
        }
        return false;
    }

    @GetMapping("/events-fields/{id}")
    public List<FormField> getEventFields(@PathVariable Long id)
    {
        List<FormField> response = fieldService.getFieldsByEvent(id);
        return response;
    }

    @PostMapping("/submit-registration")
    public Map<String, Object> submitRegistration(
        @RequestParam Long eventId,
        @RequestParam String data,
        @RequestParam(required = false) List<MultipartFile> files,
        @RequestParam(required = false) List<Long> fileFieldIds,
        @RequestParam(required = false) List<MultipartFile>excelFiles,
        @RequestParam(required = false) List<Long> excelFieldIds
    )
    {
        Map<String, Object> response = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        PublicUsers user = new PublicUsers();
       try {
        @SuppressWarnings("unchecked")
        Map<String, Object> dataMap = mapper.readValue(data, Map.class);
        String username = (String)dataMap.get("name");
        String userEmail = (String)dataMap.get("email");

        user.setName(username);
        user.setEmail(userEmail);

        PublicUsers newUser = userRepository.save(user);

        Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

        Registration registration = new Registration();
        registration.setUser(null);                registration.setEvent(event);
        registration.setStatus(RegistrationStatus.PENDING);
        registration.setDynamicData(data);
        registration.setPublicUser(newUser);

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

    @GetMapping("/public-user/REG-{id}")
    public Map<String, String> getPublicUser(@PathVariable Long id){
        String eventName = repository.findByRegistrationId("REG-"+id).getEvent().getName();
        Registration reg = repository.findByRegistrationId("REG-"+id);
        Long userId = reg.getPublicUser().getId();
        Map<String, String>response = new HashMap<>();
        Optional<PublicUsers> Optuser = userRepository.findById(userId) ;
        PublicUsers user = Optuser.get();
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("eventName", eventName);
        return response;
    }

    @GetMapping("/check-status/REG-{id}")
    public Map<String, Object>getStatus(@PathVariable String id)
    {
        Map<String, Object>response = new HashMap<>();
   
        Registration registration = repository.findByRegistrationId("REG-"+id);
        response.put("status",registration.getStatus());
        response.put("event",registration.getEvent().getName());
        response.put("regId",registration.getRegistrationId());

        return response;
    }
}