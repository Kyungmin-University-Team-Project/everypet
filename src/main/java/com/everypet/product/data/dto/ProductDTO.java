package com.everypet.product.data.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private String productName; // 상품 이름

    private Long productPrice; // 상품 가격

    private String productDescription; // 상품 설명

    private MultipartFile productImage; // 상품 이미지 파일
}
