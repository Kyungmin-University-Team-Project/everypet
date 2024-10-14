package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SelectProductDTO {

    @NotBlank
    @ApiModelProperty(example = "PRODUCT_VIEWS DESC", notes = "ORDER BY 뒤에 삽입됩니다, 정렬 기준 설정하세요 ")
    @Pattern(
            regexp = "^(PRODUCT_VIEWS DESC|PRODUCT_VIEWS ASC|" +
                    "PRODUCT_PRICE DESC|PRODUCT_PRICE ASC|" +
                    "PRODUCT_REGISTRATION_DATE DESC|PRODUCT_REGISTRATION_DATE ASC|" +
                    "PRODUCT_DISCOUNT_RATE DESC|PRODUCT_DISCOUNT_RATE ASC)$",
            message = "주어진 예시 단어만 입력 가능합니다: " +
                    "PRODUCT_VIEWS DESC, PRODUCT_VIEWS ASC, " +
                    "PRODUCT_PRICE DESC, PRODUCT_PRICE ASC, " +
                    "PRODUCT_REGISTRATION_DATE DESC, PRODUCT_REGISTRATION_DATE ASC, " +
                    "PRODUCT_DISCOUNT_RATE DESC, PRODUCT_DISCOUNT_RATE ASC"
    )
    private String orderBy;

    @NotBlank
    @ApiModelProperty(example = "강아지%", notes = "검색 조건을 설정하세요, " +
            "예시 : 강아지의 모든 물품 검색 => 강아지% ,강아지 사료를 검색 => 강아지 사료")
    private String productMainCategory;

    @NotBlank
    @ApiModelProperty(example = "강아지%", notes = "검색 조건을 설정하세요, " +
            "예시 : 강아지의 모든 물품 검색 => 강아지% ,강아지 사료를 검색 => 강아지 사료")
    private String productSubCategory;

    @Positive
    @ApiModelProperty(example = "1", notes = "페이지 번호")
    private int page;

    @Positive
    @ApiModelProperty(example = "2", notes = "페이지 사이즈, 한 페이지의 상품 수를 설정하세요")
    private int pageSize;

    @ApiModelProperty(example = "pageStart는 보내지 마세요 ", notes = "삭제하세요")
    private int pageStart;

}
