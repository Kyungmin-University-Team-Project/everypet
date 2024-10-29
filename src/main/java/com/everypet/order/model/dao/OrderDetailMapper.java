package com.everypet.order.model.dao;

import com.everypet.order.model.dto.OrderDTO;
import com.everypet.order.model.vo.OrderDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderDetailMapper {
    int insertOrderDetail(Map<String, Object> map);
    int deleteOrderDetailByOrderId(String orderId);
    List<OrderDetail> selectOrderDetailsByOrderId(String orderId);
    int updateReviewStatusToY(Long orderDetailId);
    int updateReviewStatusToN(Long reviewId);

    // 판매자 체크
    int checkSeller(Map<String, Object> map);

    // 운송장 번호 업데이트
    int updateTrackingNumber(Map<String, Object> map);

    // 주문 디테일 정보 검색
    OrderDTO.OrderDetailDTO getOrderDetailByOrderDetailId(Long orderDetailId);




}
