package com.example.demo.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Registration;
import com.example.demo.entity.TransactionData;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.TransactionDataRepository;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

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
        Document document = new Document(PageSize.A4, 30, 30, 30, 30);
        PdfWriter.getInstance(document, out);
        document.open();

        Registration registration = repository.findByRegistrationId(regId);

        // 🎨 Colors
        BaseColor primary = new BaseColor(41, 128, 185);  
        BaseColor success = new BaseColor(39, 174, 96);
        BaseColor pending = new BaseColor(243, 156, 18);

        // 🔤 Fonts
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD, BaseColor.WHITE);
        Font subTitleFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.WHITE);
        Font labelFont = new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD, BaseColor.DARK_GRAY);
        Font valueFont = new Font(Font.FontFamily.HELVETICA, 11, Font.NORMAL);
        Font footerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, primary);

        SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy, hh:mm a");

        // ================= HEADER =================
        PdfPTable header = new PdfPTable(1);
        header.setWidthPercentage(100);

        PdfPCell headerCell = new PdfPCell();
        headerCell.setBackgroundColor(primary);
        headerCell.setPadding(15);
        headerCell.setBorder(Rectangle.NO_BORDER);

        Paragraph title = new Paragraph("REGISTRATION RECEIPT", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);

        Paragraph event = new Paragraph(registration.getEvent().getName(), subTitleFont);
        event.setAlignment(Element.ALIGN_CENTER);

        headerCell.addElement(title);
        headerCell.addElement(event);
        header.addCell(headerCell);

        document.add(header);

        // ================= CARD CONTAINER =================
        PdfPTable container = new PdfPTable(1);
        container.setWidthPercentage(100);
        container.setSpacingBefore(20);

        PdfPCell card = new PdfPCell();
        card.setPadding(20);
        card.setBackgroundColor(BaseColor.WHITE);
        card.setBorder(Rectangle.NO_BORDER);

        // ================= TABLE =================
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{3, 5});

        // 🔹 User Info
        String name = "Guest";
        String email = "-";

        if (registration.getUser() != null) {
            name = registration.getUser().getName();
            email = registration.getUser().getEmail();
        } else if (registration.getPublicUser() != null) {
            name = registration.getPublicUser().getName();
            email = registration.getPublicUser().getEmail();
        }

        addStyledRow(table, "Registration ID", regId, labelFont, valueFont);
        addStyledRow(table, "Date", sdf.format(new Date()), labelFont, valueFont);
        addStyledRow(table, "Transaction ID", txn.getTransactionId(), labelFont, valueFont);
        addStyledRow(table, "Name", name, labelFont, valueFont);
        addStyledRow(table, "Email", email, labelFont, valueFont);

        if (txn.getAmount() > 0) {
            addStyledRow(table, "Amount", "₹ " + txn.getAmount(), labelFont, valueFont);        
        }

        // ================= STATUS BADGE =================
        PdfPCell statusKey = new PdfPCell(new Phrase("Status", labelFont));
        statusKey.setBorder(Rectangle.NO_BORDER);
        statusKey.setPadding(10);

        BaseColor statusColor = txn.getStatus().equalsIgnoreCase("SUCCESS") ? success : pending;

        PdfPCell statusValue = new PdfPCell(
                new Phrase(txn.getStatus(), new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE))
        );
        statusValue.setBackgroundColor(statusColor);
        statusValue.setHorizontalAlignment(Element.ALIGN_CENTER);
        statusValue.setPadding(6);
        statusValue.setBorder(Rectangle.NO_BORDER);

        table.addCell(statusKey);
        table.addCell(statusValue);

        card.addElement(table);

        container.addCell(card);
        document.add(container);

        // ================= FOOTER =================
        Paragraph footer = new Paragraph("Thank you for registering!", footerFont);
        footer.setAlignment(Element.ALIGN_CENTER);
        footer.setSpacingBefore(20);

        document.add(footer);

        document.close();

    } catch (Exception e) {
        e.printStackTrace();
    }

    return new ByteArrayInputStream(out.toByteArray());
}
    // 🔥 Helper Method for Table Rows
    private void addStyledRow(PdfPTable table, String key, String value, Font keyFont, Font valueFont) {

    PdfPCell cell1 = new PdfPCell(new Phrase(key, keyFont));
    cell1.setBorder(Rectangle.NO_BORDER);
    cell1.setPadding(10);
    cell1.setBackgroundColor(new BaseColor(245, 247, 250));

    PdfPCell cell2 = new PdfPCell(new Phrase(value, valueFont));
    cell2.setBorder(Rectangle.NO_BORDER);
    cell2.setPadding(10);

    table.addCell(cell1);
    table.addCell(cell2);
}
}