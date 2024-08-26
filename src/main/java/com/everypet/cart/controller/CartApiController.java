package com.everypet.cart.controller;

import com.everypet.cart.model.dto.CartInsertDTO;
import com.everypet.cart.model.dto.CartItemDTO;
import com.everypet.cart.service.CartService;
import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.member.model.vo.Member;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

@RequestMapping("/cart")
@Api(tags = "장바구니 Api")
@RestController
@RequiredArgsConstructor
public class CartApiController {

    private final CartService cartService;

    @ApiOperation(value = "장바구니 추가", notes = "회원의 장바구니에 상품을 추가합니다.")
    @PostMapping("/add")
    public ResponseEntity<String> addCart(@RequestBody CartInsertDTO cartInsertDTO, @AuthenticationPrincipal Member member) {
        cartService.addCart(member.getMemberId(), cartInsertDTO);
        return ResponseEntityUtil.response("장바구니 추가 성공", HttpStatus.CREATED);
    }

    @ApiOperation(value = "장바구니 조회", notes = "회원의 장바구니를 조회합니다.")
    @PostMapping("/list")
    public ResponseEntity<List<CartItemDTO>> getAllCartItem(@ApiIgnore @AuthenticationPrincipal Member member) {
        List<CartItemDTO> cart = cartService.getAllCartItem(member.getMemberId());
        return ResponseEntityUtil.response(cart, HttpStatus.OK);
    }

    @ApiOperation(value = "장바구니 삭제", notes = "회원의 장바구니에 상품을 삭제합니다.")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCart(@RequestBody Map<String, String> cartId, @AuthenticationPrincipal Member member) {
        cartService.deleteCart(member.getUsername(), cartId.get("cartId"));
        return ResponseEntityUtil.response("장바구니 삭제 성공", HttpStatus.OK);
    }

}