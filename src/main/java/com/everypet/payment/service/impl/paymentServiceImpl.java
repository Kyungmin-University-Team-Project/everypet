package com.everypet.payment.service.impl;

import com.everypet.payment.model.dao.PaymentMapper;
import com.everypet.payment.model.dto.PaymentResponse;
import com.everypet.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class paymentServiceImpl implements PaymentService {

    private final PaymentMapper paymentMapper;
    DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    @Override
    public PaymentResponse getPaymentStatus(String paymentId, String PORTONE_API_SECRET) {
        // 1. 포트원 결제내역 단건조회 API 호출
        String paymentUrl = "https://api.portone.io/payments/" + paymentId;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + PORTONE_API_SECRET);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<PaymentResponse> paymentResponseEntity =
                    restTemplate.exchange(paymentUrl, HttpMethod.GET, entity, PaymentResponse.class);

            if (paymentResponseEntity.getStatusCode() != HttpStatus.OK) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to retrieve payment info");
            }

            return paymentResponseEntity.getBody();

        } catch (HttpClientErrorException e) {
            // HTTP 오류 응답 예외 처리
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized: Invalid API key or token");
            } else if (e.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden: Access is denied");
            } else {
                throw new ResponseStatusException(e.getStatusCode(), "Client error: " + e.getMessage());
            }

        } catch (HttpServerErrorException e) {
            // 서버 오류 예외 처리
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server error: " + e.getMessage());

        } catch (ResourceAccessException e) {
            // 네트워크 오류 예외 처리
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Network error: Unable to reach PortOne API");

        } catch (Exception e) {
            // 기타 예외 처리
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred: " + e.getMessage());
        }
    }


    @Override
    public void verifyPayment(String paymentId, String PORTONE_API_SECRET) {

    }

    @Override
    public void insertPayment(PaymentResponse payment, String orderId, String paymentId) {

        Map<String, Object> map = new HashMap<>();
        map.put("paymentId", paymentId);             // 결제 고유 ID
        map.put("orderId", orderId);                               // 주문 ID
        map.put("paymentAmount", payment.getAmount().getTotal()); // 총 결제 금액
        map.put("paymentVat", payment.getAmount().getVat());      // 부가세 금액
        map.put("paymentStatus", payment.getStatus());             // 결제 상태
        map.put("receiptUrl", payment.getReceiptUrl());            // 결제 영수증 URL
        map.put("paymentMethodType", payment.getMethod().getType());// 결제 수단 타입
        map.put("requestedAt", Timestamp.valueOf(OffsetDateTime.parse(payment.getRequestedAt(), formatter).toLocalDateTime()));
        map.put("paidAt", Timestamp.valueOf(OffsetDateTime.parse(payment.getPaidAt(), formatter).toLocalDateTime()));

        paymentMapper.insertPayment(map);
    }
}
