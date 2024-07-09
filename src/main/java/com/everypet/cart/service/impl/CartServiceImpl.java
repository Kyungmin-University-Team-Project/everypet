package com.everypet.cart.service.impl;

import com.everypet.cart.mapper.CartMapper;
import com.everypet.cart.model.dto.CartInsertDTO;
import com.everypet.cart.model.dto.CartItemDTO;
import com.everypet.cart.model.vo.Cart;
import com.everypet.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartMapper cartMapper;

    @Override
    public void addCart(String memberId, CartInsertDTO cartInsertDTO) {
        Cart cart = cartInsertDTO.toEntity(memberId);
        cartMapper.insertCart(cart);
    }

    @Override
    public List<CartItemDTO> getAllCartItem(String memberId) {
        return cartMapper.selectAllCart(memberId);
    }

    @Override
    public void deleteCart(String memberId, String productId) {
        cartMapper.deleteCart(memberId, productId);
    }

}