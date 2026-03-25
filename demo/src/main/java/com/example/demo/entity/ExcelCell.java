package com.example.demo.entity;

import javax.persistence.*;

@Entity
public class ExcelCell 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long rowId;
    private Long columnId;
    private String cellValue;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getRowId() {
        return rowId;
    }
    public void setRowId(Long rowId) {
        this.rowId = rowId;
    }
    public Long getColumnId() {
        return columnId;
    }
    public void setColumnId(Long columnId) {
        this.columnId = columnId;
    }
    public String getCellValue() {
        return cellValue;
    }
    public void setCellValue(String cellValue) {
        this.cellValue = cellValue;
    }

}
