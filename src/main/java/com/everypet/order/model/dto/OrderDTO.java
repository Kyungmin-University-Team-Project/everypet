package com.everypet.order.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class OrderDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyOrderListDTO{
        private String orderId;           // 주문 ID
        private String orderDate;  // 주문 날짜
        private int totalAmount;          // 총 금액
        private int productAmount;        // 상품 금액
        private int deliveryAmount;       // 배송비
        private Long orderDetailId;       // 주문 상세 ID
        private String productId;         // 상품 ID
        private int productPrice;         // 상품 가격
        private int quantity;             // 수량
        private int discountRate;         // 할인율
        private String productName;       // 상품 이름
        private String productImg;        // 상품 이미지
        private String productCategory;   // 상품 카테고리
        private String reviewStatusYn;    // 리뷰 작성 여부 (Y/N)
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetMyOrderListDTO {
        private int page;               // 페이지 번호
        private int pageSize;           // 페이지 사이즈
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateTrackingNumberDTO {
        private int orderDetailId;       // 주문 상세 ID
        private int trackingNumber;   // 송장 번호
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDetailDTO {
        private String orderId;                // 주문 ID
        private String memberId;               // 회원 ID
        private String orderDate;              // 주문 날짜
        private int deliveryAmount;            // 배송비
        private String postalCode;             // 우편번호
        private String address;                // 기본 주소
        private String addressDetail;          // 상세 주소
        private String receiver;               // 받는 사람
        private String phone;                  // 휴대폰 번호
        private String request;                // 요청 사항
        private String orderStatus;            // 주문 상태

        private Long orderDetailId;            // 주문 상세 ID
        private String productId;              // 상품 ID
        private int productPrice;              // 상품 가격
        private int quantity;                  // 구매 수량
        private int discountRate;              // 할인율
        private String trackingNumber;         // 운송장 번호
        private String parcelCompany;          // 택배사
        private String reviewStatusYN;         // 리뷰 작성 여부
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDetailId {
        private Long orderDetailId;
    }
}