package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ExcelCell;

public interface ExcelCellRepository extends JpaRepository<ExcelCell, Long> 
{
    List<ExcelCell> findByRowId(Long rowId);
}