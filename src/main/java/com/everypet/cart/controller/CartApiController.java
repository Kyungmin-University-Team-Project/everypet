package com.everypet.cart.controller;

import com.everypet.cart.model.dto.CartInsertDTO;
import com.everypet.cart.model.dto.CartItemDTO;
import com.everypet.cart.service.CartService;
import com.everypet.member.model.vo.Member;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

@RequestMapping("/cart")
@Api(tags = "장바구니 Api")
@RestController
@RequiredArgsConstructor
public class CartApiController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addCart(@RequestBody CartInsertDTO cartInsertDTO, @AuthenticationPrincipal Member member) {

        cartService.addCart(member.getUsername(), cartInsertDTO);

        return response(HttpStatus.OK, "장바구니 추가 성공");
    }

    @PostMapping("/list")
    public List<CartItemDTO> getAllCartItem(@ApiIgnore @AuthenticationPrincipal Member member) {
        return cartService.getAllCartItem(member.getUsername());
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCart(@RequestBody Map<String, String> productId, @AuthenticationPrincipal Member member) {

        cartService.deleteCart(member.getUsername(), productId.get("productId"));

        return response(HttpStatus.OK, "장바구니 삭제 성공");
    }

    private ResponseEntity<String> response(HttpStatus httpStatus, String result) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(result);
    }

}