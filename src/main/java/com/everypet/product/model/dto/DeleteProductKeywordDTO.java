package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeleteProductKeywordDTO {

    @NotBlank
    @ApiModelProperty(example = "고양이", notes = "키워드에 해당되는 상품 리스트를 출력합니다.")
    private int keywordId;

    @Positive
    @ApiModelProperty(example = "1", notes = "페이지 번호")
    private String productId;

}
