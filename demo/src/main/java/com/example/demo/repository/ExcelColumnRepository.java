package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ExcelColumn;

public interface ExcelColumnRepository extends JpaRepository <ExcelColumn, Long> 
{
    List<ExcelColumn> findByExcelUploadIdOrderByColumnIndex(Long excelUploadId);
}
