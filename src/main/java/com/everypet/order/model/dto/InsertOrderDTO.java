package com.everypet.order.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsertOrderDTO {

    private String orderId;
    private String addressId;
    private List<Products> products;


    @Getter
    @Setter
    public static class Products {
        private String productId;
        private int quantity;
    }
}
