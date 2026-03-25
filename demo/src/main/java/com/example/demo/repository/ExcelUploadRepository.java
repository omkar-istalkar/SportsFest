package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ExcelUpload;

public interface ExcelUploadRepository extends JpaRepository<ExcelUpload, Long> {}