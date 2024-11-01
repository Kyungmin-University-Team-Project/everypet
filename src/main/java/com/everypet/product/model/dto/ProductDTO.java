package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private String productId; // 상품 아이디
    private String memberId; // 판매자 아이디
    private String productImg; // 상품 이미지
    private String productDescriptionImg; // 상품 설명 이미지
    private String productName; // 상품 이름
    private int productPrice; // 상품 가격
    private int productDiscountRate; // 상품 할인율
    private int numberOfProduct; // 상품 수량
    private String productRegistrationDate; // 상품 등록 날짜
    private String productChangedDate; // 상품 수정 날짜
    private long productViews; // 상품 조회수
    private String productCategory; // 상품 카테고리

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductInsertDTO {

        @NotBlank
        @ApiModelProperty(example = "후라이드 치킨맛 개사료", notes = "상품의 이름")
        private String productName; // 상품 이름

        @NotBlank
        @ApiModelProperty(example = "30000", notes = "상품 가격")
        private Long productPrice; // 상품 가격

        @NotBlank
        @ApiModelProperty(example = "10", notes = "상품 할인율, 0 ~ 100")
        private int productDiscountRate; // 상품 할인율

        @NotBlank
        @ApiModelProperty(example = "상품 대표 이미지 삽입", notes = "상품의 대표 이미지 넣기")
        private MultipartFile productImage; // 상품 이미지 파일

        @NotBlank
        @ApiModelProperty(example = "500", notes = "상품 수량")
        private long numberOfProduct; // 상품 수량

        @NotBlank
        @ApiModelProperty(example = "상품 설명 이미지 삽입", notes = "상품을 설명하는 이미지를 넣기")
        private MultipartFile productDescriptionImage; // 상품 설명 이미지 파일

        @NotBlank
        @ApiModelProperty(example = "cat", notes = "상품 대분류 카테고리")
        private String productMainCategory; // 상품 대분류 카테고리

        @NotBlank
        @ApiModelProperty(example = "feed", notes = "상품 소분류 카테고리")
        private String productSubCategory; // 상품 소분류 카테고리

        @NotBlank
        @ApiModelProperty(example = "Y", notes = "상품 판매 상태")
        private char productSalesStatusYN; // 상품 판매 상태

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductUpdateDTO {

        @NotBlank
        @ApiModelProperty(example = "uuid", notes = "상품의 아이디")
        private String productId; // 상품 아이디

        @NotBlank
        @ApiModelProperty(example = "후라이드 치킨맛 개사료", notes = "상품의 이름")
        private String productName; // 상품 이름

        @NotBlank
        @ApiModelProperty(example = "30000", notes = "상품 가격")
        private Long productPrice; // 상품 가격

        @NotBlank
        @ApiModelProperty(example = "10", notes = "상품 할인율, 0 ~ 100")
        private int productDiscountRate; // 상품 할인율

        @NotBlank
        @ApiModelProperty(example = "상품 대표 이미지 삽입", notes = "상품의 대표 이미지 넣기")
        private MultipartFile productImage; // 상품 이미지 파일

        @NotBlank
        @ApiModelProperty(example = "500", notes = "상품 수량")
        private long numberOfProduct; // 상품 수량

        @NotBlank
        @ApiModelProperty(example = "상품 설명 이미지 삽입", notes = "상품을 설명하는 이미지를 넣기")
        private MultipartFile productDescriptionImage; // 상품 설명 이미지 파일

        @NotBlank
        @ApiModelProperty(example = "cat", notes = "상품 대분류 카테고리")
        private String productMainCategory; // 상품 대분류 카테고리

        @NotBlank
        @ApiModelProperty(example = "feed", notes = "상품 소분류 카테고리")
        private String productSubCategory; // 상품 소분류 카테고리

        @NotBlank
        @ApiModelProperty(example = "Y", notes = "상품 판매 상태")
        private char productSalesStatusYN; // 상품 판매 상태

    }
}
