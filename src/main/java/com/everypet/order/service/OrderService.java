package com.everypet.order.service;

import com.everypet.order.model.dto.InsertOrderDTO;
import com.everypet.order.model.vo.Order;

public interface OrderService {
    void insertOrder(InsertOrderDTO insertOrderDTO, String memberId);

    void deleteOrder(String orderId);

    Order selectOrder(String orderId);

    void updateOrderStatus(String orderId, String status);
}
