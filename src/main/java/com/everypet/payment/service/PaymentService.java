package com.everypet.payment.service;

import com.everypet.payment.model.dto.PaymentResponse;

public interface PaymentService {
    PaymentResponse getPaymentStatus(String paymentId, String PORTONE_API_SECRET);
    void verifyPayment(String paymentId, String PORTONE_API_SECRET);
    void insertPayment(PaymentResponse payment, String orderId);
}
