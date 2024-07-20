package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsertProductKeywordDTO {

    @NotBlank
    @ApiModelProperty(example = "1", notes = "저장할 키워드")
    private String keyword;

    @NotBlank
    @ApiModelProperty(example = "1", notes = "상품 아이디")
    private String productId;

}
