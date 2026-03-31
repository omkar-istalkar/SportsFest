package com.example.demo.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Registration;
import com.example.demo.entity.TransactionData;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.TransactionDataRepository;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class ReceiptService {

    @Autowired
    private TransactionDataRepository tDataRepository;

    @Autowired
    private RegistrationRepository repository;

    public ByteArrayInputStream generateReceipt(String regId) {

        TransactionData txn = tDataRepository.findByRegistrationId(regId);

        if (txn == null) {
            throw new RuntimeException("Transaction not found");
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document();

            PdfWriter.getInstance(document, out);

            document.open();

            Registration registration = repository.findByRegistrationId(regId);

            document.add(new Paragraph(registration.getEvent().getName()));
            document.add(new Paragraph("\nRegistration Receipt\n"));

            document.add(new Paragraph("Registration ID : " + regId));
            document.add(new Paragraph("Date : " + new Date()));

            document.add(new Paragraph("\nTransaction ID : " + txn.getTransactionId()));
            document.add(new Paragraph("Aggregator Name : " + registration.getUser().getName()));
            document.add(new Paragraph("Aggregator Email : " + registration.getUser().getEmail()));

            if (txn.getAmount() > 0) {
                document.add(new Paragraph("Amount : " + txn.getAmount()));
                document.add(new Paragraph("Status : " + txn.getStatus()));
            }
            

            document.add(new Paragraph("\nThank you for registering!"));

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}