package com.everypet.cart.data.dao;

import com.everypet.cart.data.dto.CartItemDTO;
import com.everypet.cart.data.vo.Cart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CartMapper {
    Integer insertCart(Cart cart);
    List<CartItemDTO> selectAllCart(String memberId);
    void deleteCart(@Param("memberId")String memberId, @Param("productId")String productId);
}