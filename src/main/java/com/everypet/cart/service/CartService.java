package com.everypet.cart.service;

import com.everypet.cart.model.dto.CartInsertDTO;
import com.everypet.cart.model.dto.CartItemDTO;

import java.util.List;

public interface CartService {

    void addCart(String memberId, CartInsertDTO cartInsertDTO);

    List<CartItemDTO> getAllCartItem(String memberId);

    void deleteCart(String memberId, String productId);
}