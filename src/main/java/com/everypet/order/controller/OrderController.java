package com.everypet.order.controller;

import com.everypet.order.model.dto.InsertOrderDTO;
import com.everypet.order.model.dto.OrderDTO;
import com.everypet.order.model.vo.Order;
import com.everypet.order.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "주문 Api")
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 주문 생성
    @ApiOperation(value = "주문 추가", notes = "새로운 주문을 추가합니다.")
    @PostMapping("/insert")
    public ResponseEntity<String> insertOrder(@RequestBody InsertOrderDTO insertOrderDTO) {
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

            orderService.insertOrder(insertOrderDTO, memberId);
            return ResponseEntity.ok().body("주문 추가 완료");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 주문 삭제
    @ApiOperation(value = "주문 삭제", notes = "주문을 삭제합니다.")
    @PostMapping("/delete")
    public ResponseEntity<String> deleteOrder(String orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok().body("주문 삭제 완료");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 주문 조회
    @ApiOperation(value = "주문 조회", notes = "주문을 조회합니다.")
    @PostMapping("/select")
    public ResponseEntity<Order> selectOrder(@RequestBody String orderId) {
        try {
            return ResponseEntity.ok().body(orderService.selectOrder(orderId));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 주문 조회
    @ApiOperation(value = "주문 상세 조회", notes = "orderDetailId를 보내면 주문을 상세 조회합니다.")
    @PostMapping("/detail/select")
    public ResponseEntity<OrderDTO.OrderDetailDTO> selectOrderDetail(@RequestBody OrderDTO.OrderDetailId orderDetailId) {
        try {
            return ResponseEntity.ok().body(orderService.getOrderDetail(orderDetailId));
        }catch (RuntimeException e){
            System.out.println("에러" + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 자신이 주문한 상품 리스트 조회
    @ApiOperation(value = "자신이 주문한 주문 리스트 조회", notes = "토큰, page, pageSize를 받아서 자신이 주문한 주문 리스트를 최신순으로 조회합니다.")
    @PostMapping("/list/my")
    public ResponseEntity<List<OrderDTO.MyOrderListDTO>> getMyOrderList(@RequestBody OrderDTO.GetMyOrderListDTO request) {
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

            // 페이지 시작점 계산
            int pageStart = (request.getPage() - 1) * request.getPageSize();

            return ResponseEntity.ok().body(orderService.getMyOrderList(memberId, pageStart, request.getPageSize()));
        }catch (RuntimeException e){
            System.out.println("에러" + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 운송장 번호 추가
    @ApiOperation(value = "운송장 번호 추가", notes = "토큰(판매자 토큰), orderDetailId, trackingNumber(운송장 번호)를 받아서 운송장 번호를 추가합니다.")
    @PostMapping("/update/tracking-number")
    public ResponseEntity<String> updateTrackingNumber(@RequestBody OrderDTO.UpdateTrackingNumberDTO request) {
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
            orderService.updateTrackingNumber(memberId, request.getOrderDetailId(), request.getTrackingNumber());
            return ResponseEntity.ok().body("운송장 번호 추가 완료");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
