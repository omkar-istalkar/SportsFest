package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.RazorPayService;
import com.example.demo.utils.RazorpayUtils;
import com.razorpay.Order;
@RestController
@RequestMapping("/api/razorpay/")
@CrossOrigin
public class RazorPayController 
{  
    @Autowired
    private RazorPayService razorPayService;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount)
    {
        try {
            Order order = razorPayService.creatOrder(amount);
            return order.toString();
        } catch (Exception e) {
            return "Error: "+e.getMessage();
        }
    }

    @PostMapping("/verify")
    public String verifyPayment(@RequestBody Map<String, String> data)
    {

        try {
            String orderId = data.get("razorpay_order_id");
            String paymentId = data.get("razorpay_payment_id");
            String signature = data.get("razorpay_signature");

            String  generatedSignature = RazorpayUtils.generateSignature(orderId+"|"+paymentId, keySecret);
            if (generatedSignature.equals(signature)){
                return "SUCCESS";
            } else {
                return "FAILURE";
            }
            } catch (Exception e) {
            return "Error: "+e;
        }
    }
}