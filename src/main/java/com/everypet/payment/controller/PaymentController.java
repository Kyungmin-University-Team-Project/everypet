package com.everypet.payment.controller;

import com.everypet.cart.service.CartService;
import com.everypet.order.model.vo.Order;
import com.everypet.order.model.vo.OrderDetail;
import com.everypet.order.service.OrderService;
import com.everypet.payment.model.dto.PaymentRequest;
import com.everypet.payment.model.dto.PaymentResponse;
import com.everypet.payment.service.PaymentService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Api(tags = "주문 Api")
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final OrderService orderService;
    private final PaymentService paymentService;
    private final CartService cartService;

    @Value("${portone.api.secret}")
    private String PORTONE_API_SECRET; // 포트원 콘솔에서 발급받은 시크릿 // 포트원 콘솔에서 발급받은 시크릿

    @PostMapping("/complete")
    public ResponseEntity<String> completePayment(@RequestBody PaymentRequest paymentRequest) {

        // 요청의 body로 paymentId와 orderId가 전달됩니다.
        String paymentId = paymentRequest.getPaymentId();
        String  orderId = paymentRequest.getOrderId();

        try {
            // 1. 포트원 결제내역 단건조회 API 호출
            PaymentResponse payment = paymentService.getPaymentStatus(paymentId, PORTONE_API_SECRET);

            // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
            Order order = orderService.selectOrder(orderId);

            if (order.getTotalAmount() == (payment.getAmount().getTotal())) {
                switch (payment.getStatus()) {
                    case "VIRTUAL_ACCOUNT_ISSUED":
                        // 가상 계좌가 발급된 상태입니다.
                        // 계좌 정보를 이용해 원하는 로직을 구성하세요.
                        break;
                    case "PAID":
                        // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
                        orderService.updateOrderStatus(orderId, "PAID");
                        // 장바구니 삭제
                        for (OrderDetail orderDetail : order.getOrderDetails()) {
                            cartService.deleteCart(order.getMemberId(), orderDetail.getProductId());
                        }
                        // 결제정보 저장
                        paymentService.insertPayment(payment, orderId, paymentId);
                        break;
                    default:
                        orderService.deleteOrder(orderId);
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unhandled payment status: " + payment.getStatus());
                }
                return ResponseEntity.ok("Payment completed successfully");
            } else {
                // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
                orderService.deleteOrder(orderId);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment amount mismatch");
            }

        } catch (Exception e) {
            // 결제 검증에 실패했습니다.
            orderService.deleteOrder(orderId);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment verification failed: " + e.getMessage());
        }
    }
}
