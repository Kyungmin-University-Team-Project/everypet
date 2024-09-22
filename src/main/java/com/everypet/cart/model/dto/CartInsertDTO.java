package com.everypet.cart.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartInsertDTO {

    @ApiModelProperty(example = "58ee090a-7401-43ea-98fa-4c8c119d5f7e", notes = "상품 ID")
    private String productId;

    @ApiModelProperty(example = "3", notes = "수량")
    private Integer cartQuantity;

}