package com.example.demo.entity;

import javax.persistence.*;

@Entity
public class TransactionData 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String transactionId;
    private String registrationId;
    private Integer amount;
    private String status = "PENDING";
    private String razorPayResponse;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getRegistrationId() {
        return registrationId;
    }
    public void setRegistrationId(String registrationId) {
        this.registrationId = registrationId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getRazorPayResponse() {
        return razorPayResponse;
    }
    public void setRazorPayResponse(String razorPayResponse) {
        this.razorPayResponse = razorPayResponse;
    }
    
}
