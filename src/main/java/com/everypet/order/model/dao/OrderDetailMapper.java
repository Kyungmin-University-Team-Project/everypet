package com.everypet.order.model.dao;

import com.everypet.order.model.vo.OrderDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderDetailMapper {
    int insertOrderDetail(Map<String, Object> map);
    int deleteOrderDetailByOrderId(String orderId);
    List<OrderDetail> selectOrderDetailsByOrderId(String orderId);
}
