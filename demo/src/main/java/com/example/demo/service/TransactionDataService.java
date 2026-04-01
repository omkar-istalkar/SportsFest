package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Registration;
import com.example.demo.entity.TransactionData;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.TransactionDataRepository;

@Service
public class TransactionDataService 
{

    @Autowired
    private RegistrationRepository rRepository;

    @Autowired
    private TransactionDataRepository tRepository;

    @Autowired
    private EventRepository eRepository;

    public void SaveTransaction(String regId)
    {
        Registration registration = rRepository.findByRegistrationId(regId);

        TransactionData tData = new TransactionData();
        tData.setRegistrationId(regId);
        tData.setTransactionId(GenerateTransId(regId));
        tData.setAmount(registration.getEvent().getAmount());
        
        tRepository.save(tData);
    }

    public String GenerateTransId(String id)
    {
        return LocalDateTime.now()+id;
    }
}