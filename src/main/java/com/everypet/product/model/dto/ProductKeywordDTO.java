package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductKeywordDTO {

    @NotBlank
    @ApiModelProperty(example = "이 상품은 사람이 먹어도 맛있어요", notes = "이 키워드를 검색하면 상품이 검색됩니다. 해시태그 느낌 / 추가 or 삭제 할 키워드 넣기")
    private int keyword;

    @NotBlank
    @ApiModelProperty(example = "uuid", notes = "상품의 아이디")
    private String productId;

}
