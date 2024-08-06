package com.everypet.member.mapper;

import com.everypet.member.model.dto.AddressDTO;
import com.everypet.member.model.vo.Address;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AddressMapper {
    AddressMapper INSTANCE = Mappers.getMapper(AddressMapper.class);

    Address toVo(AddressDTO dto, String memberId);

    AddressDTO toDto(Address entity);
}