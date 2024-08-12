package com.everypet.order.service.impl;

import com.everypet.order.model.dao.OrderDetailMapper;
import com.everypet.order.model.dao.OrderMapper;
import com.everypet.order.model.dto.InsertOrderDTO;
import com.everypet.order.model.vo.Order;
import com.everypet.order.service.OrderService;
import com.everypet.product.model.dao.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final ProductMapper productMapper;
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;

    @Override
    public void insertOrder(InsertOrderDTO insertOrderDTO, String memberId) {

        int totalAmount = 0;

        // 주문 상품의 가격을 조회하고, 총 금액을 계산한다.
        for (InsertOrderDTO.Products product : insertOrderDTO.getProducts()){
            int discountedProductPrice = productMapper.selectDiscountedProductPriceByProductId(product.getProductId());
            totalAmount += discountedProductPrice * product.getQuantity();
        }

        // 주문 정보를 저장한다.
        Map<String, Object> map = new HashMap<>();
        map.put("orderId", insertOrderDTO.getOrderId());
        map.put("memberId", memberId);
        map.put("totalAmount", totalAmount);
        map.put("addressId", insertOrderDTO.getAddressId());

        orderMapper.insertOrder(map);

        // 주문 디테일 정보를 저장한다.
        for (InsertOrderDTO.Products product : insertOrderDTO.getProducts()){
            Map<String, Object> orderDetailMap = new HashMap<>();
            orderDetailMap.put("orderId", insertOrderDTO.getOrderId());
            orderDetailMap.put("productId", product.getProductId());
            orderDetailMap.put("quantity", product.getQuantity());

            orderDetailMapper.insertOrderDetail(orderDetailMap);
        }
    }

    @Override
    public void deleteOrder(String orderId) {
        // 주문 디테일 정보를 삭제한다.
        orderDetailMapper.deleteOrderDetailByOrderId(orderId);
        // 주문 정보를 삭제한다.
        orderMapper.deleteOrderByOrderId(orderId);

    }

    @Override
    public Order selectOrder(String orderId) {

        Order order = orderMapper.selectOrderById(orderId);
        order.setOrderDetails(orderDetailMapper.selectOrderDetailsByOrderId(orderId));

        return order;
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {

            Map<String, Object> map = new HashMap<>();
            map.put("orderId", orderId);
            map.put("status", status);

            orderMapper.updateOrderStatusByOrderId(map);
    }

}
