package com.everypet.order.model.vo;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    private String orderId;
    private String memberId;
    private String orderDate;
    private int totalAmount;
    private String address;
    private String receiver;
    private String phone;
    private String request;
    private String orderStatus;

    private List<OrderDetail> orderDetails;

}
