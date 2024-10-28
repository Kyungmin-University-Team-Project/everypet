package com.everypet.order.service;

import com.everypet.order.model.dto.InsertOrderDTO;
import com.everypet.order.model.dto.OrderDTO;
import com.everypet.order.model.vo.Order;

import java.util.List;

public interface OrderService {
    void insertOrder(InsertOrderDTO insertOrderDTO, String memberId);

    void deleteOrder(String orderId);

    Order selectOrder(String orderId);

    void updateOrderStatus(String orderId, String status);

    List<OrderDTO.MyOrderListDTO> getMyOrderList(String memberId, int pageStart, int pageSize);

    void updateTrackingNumber(String memberId, int orderDetailId, int trackingNumber);
}
