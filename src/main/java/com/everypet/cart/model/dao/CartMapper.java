package com.everypet.cart.model.dao;

import com.everypet.cart.model.dto.CartItemDTO;
import com.everypet.cart.model.vo.Cart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CartMapper {
    Integer insertCart(Cart cart);
    List<CartItemDTO> selectAllCart(String memberId);
    void deleteCart(@Param("memberId")String memberId, @Param("cartId")String productId);
}