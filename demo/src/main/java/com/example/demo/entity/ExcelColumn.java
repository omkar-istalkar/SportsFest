package com.example.demo.entity;

import javax.persistence.*;

@Entity
public class ExcelColumn 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private Long excelUploadId;
    private Integer columnIndex;
    private String columnName;

    //Getters and setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getExcelUploadId() {
        return excelUploadId;
    }
    public void setExcelUploadId(Long excelUploadId) {
        this.excelUploadId = excelUploadId;
    }
    public Integer getColumnIndex() {
        return columnIndex;
    }
    public void setColumnIndex(Integer columnIndex) {
        this.columnIndex = columnIndex;
    }
    public String getColumnName() {
        return columnName;
    }
    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }
    
}

