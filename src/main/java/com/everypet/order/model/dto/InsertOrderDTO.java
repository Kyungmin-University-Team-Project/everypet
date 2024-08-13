package com.everypet.order.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsertOrderDTO {

    private String orderId;        // 주문 ID
    private String addressId;      // 주소 ID
    private List<Products> products; // 주문한 제품 목록
    private int delivery;          // 배달비

    private String postalCode;     // 우편번호
    private String address;        // 기본 주소
    private String addressDetail;  // 상세 주소
    private String receiver;       // 받는 사람
    private String phone;          // 전화번호
    private String request;        // 요청사항

    @Getter
    @Setter
    public static class Products {
        private String productId;
        private int quantity;
    }
}

