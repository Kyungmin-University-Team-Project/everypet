package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateDTO {

    @NotBlank
    @ApiModelProperty(example = "user", notes = "임시 회원의 아이디")
    private String memberId; // 임시 회원 아이디

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
    @ApiModelProperty(example = "사료", notes = "상품 카테고리")
    private String productCategory; // 상품 카테고리

    @NotBlank
    @ApiModelProperty(example = "Y", notes = "상품 판매 상태")
    private char productSalesStatusYN; // 상품 판매 상태

    @Null
    @ApiModelProperty(example = "2021-05-20", notes = "상품 수정일, 보내지 마세요")
    private LocalDateTime productUpdateDate; // 상품 수정일
}
