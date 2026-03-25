package com.example.demo.entity;

import javax.persistence.*;

@Entity
public class ExcelRow 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long excelUploadId;
    private Integer rowIndex;
    
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
    public Integer getRowIndex() {
        return rowIndex;
    }
    public void setRowIndex(Integer rowIndex) {
        this.rowIndex = rowIndex;
    }

    
}
