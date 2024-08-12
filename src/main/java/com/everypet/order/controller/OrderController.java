package com.everypet.order.controller;

import com.everypet.order.model.dto.InsertOrderDTO;
import com.everypet.order.model.vo.Order;
import com.everypet.order.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


        HttpStatus httpStatus;
        String result;

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            orderService.insertOrder(insertOrderDTO, memberId);
            httpStatus = HttpStatus.OK;
            result = "주문 등록 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    // 주문 삭제
    @ApiOperation(value = "주문 삭제", notes = "주문을 삭제합니다.")
    @PostMapping("/delete")
    public ResponseEntity<String> deleteOrder(String orderId) {

        HttpStatus httpStatus;
        String result;

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            orderService.deleteOrder(orderId);
            httpStatus = HttpStatus.OK;
            result = "주문 삭제 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    // 주문 조회
    @ApiOperation(value = "주문 조회", notes = "주문을 조회합니다.")
    @PostMapping("/select")
    public Order selectOrder(String orderId) {

        return orderService.selectOrder(orderId);
    }

    // 주문 리스트 조회


    // ----------------------------------------------------------------------------------------------
    private ResponseEntity<String> response(HttpStatus httpStatus,String result) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(result);
    }
}
