package com.everypet.payment.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private String status;          // 결제 상태
    private String requestedAt;     // 결제 요청 시각
    private String paidAt;          // 결제 완료 시각
    private String paymentUid;      // 결제 고유 ID
    private String merchantUid;     // 상점 고유 주문 ID
    private String receiptUrl;      // 결제 영수증 URL
    private PaymentAmount payment;  // 결제 금액 정보
    private PaymentMethod method;   // 결제 수단 정보

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentAmount {
        private int total;          // 총 결제 금액
        private int vat;            // 부가세 금액
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentMethod {
        private String type;        // 결제 수단 타입
    }
}

