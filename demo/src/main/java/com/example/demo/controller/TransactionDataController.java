package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.TransactionData;
import com.example.demo.repository.TransactionDataRepository;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/api/transaction/")
@CrossOrigin
public class TransactionDataController 
{
    @Value("${razorpay.key_id}")
    private String razorPayKey;

    @Value("${razorpay.key_secret}")
    private String razorPaySecret;


    @Autowired
    private TransactionDataRepository tRepository;

    @GetMapping("/{id}")
    public TransactionData getTransactionsDetails(@PathVariable String id)
    {
        TransactionData tData = tRepository.findByRegistrationId(id);
        return tData;
    }

    @PostMapping("/approve/{id}")
    public String approveTransaction(@PathVariable String id)
    {
        TransactionData tData = tRepository.findByRegistrationId(id);
        tData.setStatus("SUCCESS");
        tRepository.save(tData);
        return "Done";
    }

    @PostMapping("/reject/{id}")
    public String rejectTransaction(@PathVariable String id)
    {
        TransactionData tData = tRepository.findByRegistrationId(id);
        tData.setStatus("REJECTED");
        tRepository.save(tData);
        return "Done";
    }
    
    @PostMapping("/setRazorpayData/{paymentId}/{id}")
    public String setRazorPayData(@PathVariable String paymentId, @PathVariable String id)
    {
        String res = "";
        String response = "";
        try{
            RazorpayClient client = new RazorpayClient(razorPayKey, razorPaySecret);
            com.razorpay.Payment payment = client.payments.fetch(paymentId);
            res = payment.get("status");
            response = payment.toString();
        } catch (Exception e){
            System.out.println("Got Exception: "+e);
        }

        TransactionData tData = tRepository.findByRegistrationId(id);
        tData.setTransactionId(paymentId);
        if (res.equals("captured")) {
            tData.setStatus("SUCCESS");
        }
        tData.setRazorPayResponse(response);
        tRepository.save(tData);
        return "Modified transaction data";
    }
}
