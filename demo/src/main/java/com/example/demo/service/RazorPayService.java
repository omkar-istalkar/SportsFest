package com.example.demo.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class RazorPayService 
{
    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    public Order creatOrder(int amount) throws Exception
    {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", amount*100);
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        System.out.println("\n\n\nAmount received from frontend: " + amount);
        System.out.println("Amount sent to Razorpay: " + (amount * 100)+"\n\n\n");

        return client.orders.create(options);
    }
}