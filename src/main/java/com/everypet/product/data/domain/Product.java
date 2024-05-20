package com.everypet.product.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private Long productId; // 상품 아이디

    private String productName; // 상품 이름

    private Long productPrice; // 상품 가격

    private String productDescription; // 상품 설명

    private String productImage; // 상품 이미지

}
