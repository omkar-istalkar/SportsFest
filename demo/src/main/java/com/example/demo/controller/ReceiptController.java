package com.example.demo.controller;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ReceiptService;

@RestController
@RequestMapping("/api/registration")
public class ReceiptController {

    @Autowired
    private ReceiptService rService;

    @GetMapping("/{id}/receipt")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable String id)
    {
        ByteArrayInputStream pdf = rService.generateReceipt(id);

        byte[] pdfBytes;
        try {
            pdfBytes = IOUtils.toByteArray(pdf);
            return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=receipt_" + id + ".pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdfBytes);
        } catch (IOException e) {
            
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);

        }
    }

    @GetMapping("/{id}/receipt/preview")
    public ResponseEntity<byte[]> previewReceipt(@PathVariable String id) {
        ByteArrayInputStream pdf = rService.generateReceipt(id);

        try {
            byte[] pdfBytes = IOUtils.toByteArray(pdf);

            return ResponseEntity.ok()
                    // 🔥 IMPORTANT CHANGE
                    .header("Content-Disposition", "inline; filename=receipt_" + id + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
