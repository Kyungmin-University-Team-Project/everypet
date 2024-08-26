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
public class CartItemDTO {

        @ApiModelProperty(example = "1", notes = "장바구니 아이디")
        private String cartId;

        @ApiModelProperty(example = "https://storage.googleapis.com/every_pet_img/1f7832af-e587-495e-bf00-b14f9f3bf137", notes = "상품 이미지")
        private String productImg;

        @ApiModelProperty(example = "가필드 카사바 모래 보라 굵은입자 4.55kg", notes = "상품 이름")
        private String productName;

        @ApiModelProperty(example = "6999", notes = "상품 가격")
        private int price;

        @ApiModelProperty(example = "10", notes = "할인율")
        private int discountRate;

        @ApiModelProperty(example = "3", notes = "수량")
        private int cartQuantity;

}