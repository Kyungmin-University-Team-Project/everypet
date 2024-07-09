package com.everypet.cart.model.dto;

import com.everypet.cart.model.vo.Cart;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartInsertDTO {

    private String productId;

    private Integer cartQuantity;

    public Cart toEntity(String memberId) {
        return Cart.builder()
                .memberId(memberId)
                .productId(productId)
                .cartQuantity(cartQuantity)
                .build();
    }

}