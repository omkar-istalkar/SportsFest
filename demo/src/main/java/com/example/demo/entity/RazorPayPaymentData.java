package com.example.demo.entity;

import javax.persistence.*;

@Entity
public class RazorPayPaymentData 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String orderId;
    private String paymentId;
    private Integer amount;
    private String txnStatus;
    
    public Long getId() {
        return Id;
    }
    public void setId(Long id) {
        Id = id;
    }
    public String getOrderId() {
        return orderId;
    }
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    public String getPaymentId() {
        return paymentId;
    }
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getTxnStatus() {
        return txnStatus;
    }
    public void setTxnStatus(String txnStatus) {
        this.txnStatus = txnStatus;
    }
}