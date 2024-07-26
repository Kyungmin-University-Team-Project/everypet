package com.everypet.product.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductListDTO {

    private String productId; // 상품 아이디
    private String memberId; // 판매자 아이디
    private String productImg; // 상품 이미지
    private String productDescriptionImg; // 상품 설명 이미지
    private String productName; // 상품 이름
    private int productPrice; // 상품 가격
    private int productDiscountRate; // 상품 할인율
    private String productRegistrationDate; // 상품 등록 날짜
    private long productViews; // 상품 조회수
    private String productCategory; // 상품 카테고리
}
