package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ExcelRow;

public interface ExcelRowRepository extends JpaRepository<ExcelRow, Long> 
{
   List<ExcelRow> findByExcelUploadIdOrderByRowIndex(Long excelUploadId);
}