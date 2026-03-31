package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.TransactionData;

public interface TransactionDataRepository extends JpaRepository<TransactionData, Long>
{

    TransactionData findByRegistrationId(String id);

}