package com.everypet.order.service.impl;

import com.everypet.order.model.dao.OrderDetailMapper;
import com.everypet.order.model.dao.OrderMapper;
import com.everypet.order.model.dto.InsertOrderDTO;
import com.everypet.order.model.dto.OrderDTO;
import com.everypet.order.model.vo.Order;
import com.everypet.order.service.OrderService;
import com.everypet.product.model.dao.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final ProductMapper productMapper;
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;

    @Override
    @Transactional
    public void insertOrder(InsertOrderDTO insertOrderDTO, String memberId) {

        int totalAmount = 0;
        try {
            // 주문 상품의 가격을 조회하고, 총 금액을 계산한다.
            for (InsertOrderDTO.Products product : insertOrderDTO.getProducts()){
                int discountedProductPrice = productMapper.selectDiscountedProductPriceByProductId(product.getProductId());
                totalAmount += discountedProductPrice * product.getQuantity();
            }
            totalAmount += insertOrderDTO.getDelivery(); // 배송비 추가

            // 주문 정보를 저장한다.
            Map<String, Object> map = new HashMap<>();

            map.put("orderId", insertOrderDTO.getOrderId());
            map.put("memberId", memberId);
            map.put("totalAmount", totalAmount);
            map.put("productAmount", totalAmount - insertOrderDTO.getDelivery());
            map.put("deliveryAmount", insertOrderDTO.getDelivery());

            // 배송 정보 추가
            map.put("postalCode", insertOrderDTO.getPostalCode());
            map.put("address", insertOrderDTO.getAddress());
            map.put("addressDetail", insertOrderDTO.getAddressDetail());
            map.put("receiver", insertOrderDTO.getReceiver());
            map.put("phone", insertOrderDTO.getPhone());
            map.put("request", insertOrderDTO.getRequest());

            int insertOrderResult = orderMapper.insertOrder(map);

            if (insertOrderResult == 0) {
                throw new RuntimeException("주문 등록에 실패했습니다.");
            }
        }catch (Exception e) {
            throw new RuntimeException("주문 등록에 실패했습니다.");
        }


        try {
            // 주문 디테일 정보를 저장한다.
            for (InsertOrderDTO.Products product : insertOrderDTO.getProducts()){
                Map<String, Object> orderDetailMap = new HashMap<>();
                orderDetailMap.put("orderId", insertOrderDTO.getOrderId());
                orderDetailMap.put("productId", product.getProductId());
                orderDetailMap.put("quantity", product.getQuantity());

                orderDetailMapper.insertOrderDetail(orderDetailMap);
            }
        }catch (Exception e) {
            System.out.println("주문 디테일 등록에 실패했습니다.");
            throw new RuntimeException("주문 디테일 등록에 실패했습니다.");
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
            map.put("orderStatus", status);

            orderMapper.updateOrderStatusByOrderId(map);
    }

    @Override
    public List<OrderDTO.MyOrderListDTO> getMyOrderList(String memberId, int pageStart, int pageSize) {
        // 파라미터를 담을 Map 생성
        Map<String, Object> params = new HashMap<>();
        params.put("memberId", memberId);
        params.put("pageStart", pageStart);
        params.put("pageSize", pageSize);

        return orderMapper.selectOrderListByMember(params);
    }

}
