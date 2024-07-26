package com.everypet.product.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private String productId; // 상품 아이디
    private String memberId; // 판매자 아이디
    private String productName; // 상품 이름
    private int productPrice; // 상품 가격
    private int productDiscountRate; // 상품 할인율
    private int numberOfProduct; // 상품 수량
    private String productRegistrationDate; // 상품 등록 날짜
    private String productChangedDate; // 상품 수정 날짜
    private char productSalesStatusYn; // 상품 판매 여부
    private long productViews; // 상품 조회수
    private String productCategory; // 상품 카테고리

}
