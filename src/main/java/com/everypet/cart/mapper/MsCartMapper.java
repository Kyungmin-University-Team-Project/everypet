package com.everypet.cart.mapper;

import com.everypet.cart.model.dto.CartInsertDTO;
import com.everypet.cart.model.vo.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsCartMapper {

    MsCartMapper INSTANCE = Mappers.getMapper(MsCartMapper.class);

    Cart toVo(CartInsertDTO dto, String memberId);

}