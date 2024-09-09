package com.everypet.order.model.dao;

import com.everypet.order.model.vo.Order;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface OrderMapper {
    int insertOrder(Map<String, Object> map);
    int deleteOrderByOrderId(String orderId);
    Order selectOrderById(String orderId);
    int updateOrderStatusByOrderId(Map<String, Object> map);
}
