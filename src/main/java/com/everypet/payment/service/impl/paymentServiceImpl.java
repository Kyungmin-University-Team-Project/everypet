package com.everypet.payment.service.impl;

import com.everypet.payment.model.dao.PaymentMapper;
import com.everypet.payment.model.dto.PaymentResponse;
import com.everypet.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class paymentServiceImpl implements PaymentService {

    private final PaymentMapper paymentMapper;

    @Override
    public PaymentResponse getPaymentStatus(String paymentId, String PORTONE_API_SECRET) {

        // 1. 포트원 결제내역 단건조회 API 호출
        String paymentUrl = "https://api.portone.io/payments/" + paymentId;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + PORTONE_API_SECRET);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<PaymentResponse> paymentResponseEntity =
                restTemplate.exchange(paymentUrl, HttpMethod.GET, entity, PaymentResponse.class);

        if (paymentResponseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to retrieve payment info");
        }

        return paymentResponseEntity.getBody();
    }

    @Override
    public void verifyPayment(String paymentId, String PORTONE_API_SECRET) {

    }

    @Override
    public void insertPayment(PaymentResponse payment, String orderId) {

        Map<String, Object> map = new HashMap<>();
        map.put("paymentId", payment.getPaymentUid());             // 결제 고유 ID
        map.put("orderId", orderId);                               // 주문 ID
        map.put("paymentAmount", payment.getPayment().getTotal()); // 총 결제 금액
        map.put("paymentVat", payment.getPayment().getVat());      // 부가세 금액
        map.put("paymentStatus", payment.getStatus());             // 결제 상태
        map.put("merchantUid", payment.getMerchantUid());          // 상점 고유 주문 ID
        map.put("receiptUrl", payment.getReceiptUrl());            // 결제 영수증 URL
        map.put("paymentMethodType", payment.getMethod().getType());// 결제 수단 타입
        map.put("requestedAt", payment.getRequestedAt());          // 결제 요청 시각
        map.put("paidAt", payment.getPaidAt());                    // 결제 완료 시각

        paymentMapper.insertPayment(map);
    }
}
