package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.service.ExcelService;

@RestController
@RequestMapping("/api/excel")
public class ExcelController 
{
    @Autowired
    private ExcelService excelService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadExcel(
        @RequestParam("file") MultipartFile file,
        @RequestParam String registrationId,
        @RequestParam Long fieldId
    )
    {
        try 
        {
            Long excelId = excelService.process(file, registrationId, fieldId);

            Map<String, Object> response = new HashMap<>();
            response.put("excelUploadId", excelId);
            response.put("message", "Excel uploaded and processed successfully");
            return ResponseEntity.ok(response);  
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExcel(@PathVariable Long id)
    {
        try 
        {
            return ResponseEntity.ok(excelService.getExcelData(id));    
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}