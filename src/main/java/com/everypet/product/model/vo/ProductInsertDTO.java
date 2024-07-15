package com.everypet.product.model.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductInsertDTO {

    private String productId; // 상품 ID
    private String memberId; // 판매자 아이디
    private String productName; // 상품 이
    private Long productPrice; // 상품 가격
    private long numberOfProduct; // 상품 수량
    private int productDiscountRate; // 상품 할인율
    private char productSalesStatusYN; // 상품 판매 상태
    private String productCategory; // 상품 카테고리

}
