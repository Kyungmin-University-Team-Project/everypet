package com.everypet.cart.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {

        private String productId;

        private String productName;

        private String productPrice;

        private Integer cartQuantity;
}
