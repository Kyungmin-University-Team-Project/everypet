package com.everypet.order.model.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetail {

    private String orderDetailId;
    private String orderId;
    private String productId;
    private int productPrice;
    private int quantity;
    private int discountRate;

}
