package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.TransactionData;
import com.example.demo.repository.TransactionDataRepository;

@RestController
@RequestMapping("/api/transaction/")
public class TransactionDataController 
{

    @Autowired
    private TransactionDataRepository tRepository;

    @GetMapping("/{id}")
    public TransactionData getTransactionsDetails(@PathVariable String id)
    {
        TransactionData tData = tRepository.findByRegistrationId(id);
        return tData;
    }

    
}
