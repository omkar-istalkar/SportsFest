package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.RazorPayPaymentData;

public interface RazorPayPaymentDataRepository extends JpaRepository<RazorPayPaymentData, Long> {
    Boolean existsByPaymentId(String paymentId);
}