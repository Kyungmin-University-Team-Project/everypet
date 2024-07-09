package com.everypet.cart.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    String memberId;

    String productId;

    Integer cartQuantity;
}