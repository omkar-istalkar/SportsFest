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
import com.example.demo.entity.RazorPayPaymentData;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RazorPayPaymentDataRepository;
import com.example.demo.service.RazorPayService;
import com.example.demo.utils.RazorpayUtils;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/api/razorpay/")
@CrossOrigin
public class RazorPayController 
{  
    @Autowired
    private RazorPayService razorPayService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RazorPayPaymentDataRepository razorPayPaymentDataRepository;

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount, @RequestBody Map<String, Long> data)
    {
        try {
            Long eventId = data.get("eventId");
            Integer Oamount = eventRepository.findById(eventId).get().getAmount();
            if(amount == Oamount){
                            Order order = razorPayService.creatOrder(Oamount);
                return order.toString();
            }
            throw new RuntimeException();
        } catch (Exception e) {
            return "Error: "+e.getMessage();
        }
    }

    @PostMapping("/fetch-order")
    public String fetchOrder(@RequestParam String orderId)
    {
        try {
            RazorpayClient client = new RazorpayClient(keyId, keySecret);
            Order order = client.orders.fetch(orderId);
            return order.toString();
        } catch (Exception e) {
            return "Error: "+e;
        }
    }

    @PostMapping("/verify")
    public String verifyPayment(@RequestBody Map<String, String> data)
    {
        try {
            String orderId = data.get("razorpay_order_id");
            String paymentId = data.get("razorpay_payment_id");
            String signature = data.get("razorpay_signature");

            if(razorPayPaymentDataRepository.existsByPaymentId(paymentId)){
                return "ALREADY_PROCESSED";
            }

            String  generatedSignature = RazorpayUtils.generateSignature(orderId+"|"+paymentId, keySecret);
            if (generatedSignature.equals(signature)){
                RazorpayClient client = new RazorpayClient(keyId, keySecret);
                com.razorpay.Payment payment = client.payments.fetch(paymentId);

                String status = payment.get("status");
                if (status.equals("captured")) {
                    RazorPayPaymentData paymentData = new RazorPayPaymentData();
                    paymentData.setOrderId(orderId);
                    paymentData.setPaymentId(paymentId);
                    paymentData.setTxnStatus("SUCCESS");
                    paymentData.setAmount(Integer.parseInt(payment.get("amount").toString()));

                    razorPayPaymentDataRepository.save(paymentData);
                }
                
                return "SUCCESS";
            } else {
                return "FAILURE";
            }
            } catch (Exception e) {
            return "Error: "+e;
        }
    }

}