package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.ExcelCell;
import com.example.demo.entity.ExcelColumn;
import com.example.demo.entity.ExcelRow;
import com.example.demo.entity.ExcelUpload;
import com.example.demo.repository.ExcelCellRepository;
import com.example.demo.repository.ExcelColumnRepository;
import com.example.demo.repository.ExcelRowRepository;
import com.example.demo.repository.ExcelUploadRepository;

@Service
public class ExcelService 
{
    @Autowired
    private ExcelUploadRepository uploadRepository;

    @Autowired
    private ExcelColumnRepository columnRepository;

    @Autowired
    private ExcelRowRepository rowRepository;

    @Autowired
    private ExcelCellRepository cellRepository;

    @SuppressWarnings("resource")
    @Transactional
    public Long process(
        MultipartFile file,
        String registrationId,
        Long fieldId
    )
    {
        try 
        {
            if(file.isEmpty()) throw new RuntimeException("File is empty");
            
            String filename = file.getOriginalFilename();
            if (filename == null || !filename.endsWith(".xlsx")) {
                throw new RuntimeException("Only .xlsx allowed");
            }

            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            ExcelUpload upload = new ExcelUpload();
            upload.setRegistrationId(registrationId);
            upload.setFieldId(fieldId);
            upload.setUploadedAt(LocalDateTime.now());
            upload.setStatus("PROCESSING");

            upload = uploadRepository.save(upload);

            Row headerRow = sheet.getRow(0);
            if (headerRow == null) 
                {
                    throw new RuntimeException("Invalid Excel: Header row missing");
                }
            int totalColumns = headerRow.getLastCellNum();

            List<ExcelColumn> columns = new ArrayList<>();

            for(int i = 0; i < totalColumns; i++)
            {
                ExcelColumn col = new ExcelColumn();
                col.setExcelUploadId(upload.getId());
                col.setColumnIndex(i);
                col.setColumnName(headerRow.getCell(i).toString());

                columns.add(col);
            }

            columnRepository.saveAll(columns);

            int totalRows = 0;

            for(int i = 1; i <= sheet.getLastRowNum(); i++)
            {
                Row sheetRow = sheet.getRow(i);
                if(sheetRow == null) continue;

                ExcelRow row = new ExcelRow();
                row.setExcelUploadId(upload.getId());
                row.setRowIndex(i);

                row = rowRepository.save(row);

                List<ExcelCell> cells = new ArrayList<>();
                for(int j = 0; j< totalColumns; j++)
                {
                    Cell cell = sheetRow.getCell(j);

                    ExcelCell excelCell = new ExcelCell();
                    excelCell.setRowId(row.getId());
                    excelCell.setColumnId(columns.get(j).getId());
                    excelCell.setCellValue(cell != null ? cell.toString() : "");

                    cells.add(excelCell);
                }

                cellRepository.saveAll(cells);
                totalRows ++;
            }

            upload.setTotalRows(totalRows);
            upload.setTotalColumns(totalColumns);
            upload.setStatus("PROCESSED");

            uploadRepository.save(upload);
            workbook.close();
            return upload.getId();

        } catch (Exception e) {
            throw new RuntimeException("Excel processing failed : "+e.getMessage());
        }
    }

    public Map<String, Object> getExcelData(Long excelUploadId) {

        List<ExcelColumn> columns =
                columnRepository.findByExcelUploadIdOrderByColumnIndex(excelUploadId);

        List<ExcelRow> rows =
                rowRepository.findByExcelUploadIdOrderByRowIndex(excelUploadId);

        List<String> columnNames = new ArrayList<>();
        for (ExcelColumn col : columns) {
            columnNames.add(col.getColumnName());
        }

        List<List<String>> tableRows = new ArrayList<>();

        for (ExcelRow row : rows) {

            List<ExcelCell> cells = cellRepository.findByRowId(row.getId());

            Map<Long, String> cellMap = new HashMap<>();
            for (ExcelCell cell : cells) {
                cellMap.put(cell.getColumnId(), cell.getCellValue());
            }

            List<String> rowData = new ArrayList<>();
            for (ExcelColumn col : columns) {
                rowData.add(cellMap.getOrDefault(col.getId(), ""));
            }

            tableRows.add(rowData);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("columns", columnNames);
        result.put("rows", tableRows);

        return result;
    }

    // ✅ SAFE CELL VALUE HANDLING
    private String getCellValue(Cell cell) {
        if (cell == null) return "";

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }
}