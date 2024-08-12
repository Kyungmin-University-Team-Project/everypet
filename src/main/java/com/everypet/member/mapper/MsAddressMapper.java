package com.everypet.member.mapper;

import com.everypet.member.model.dto.AddressDTO;
import com.everypet.member.model.vo.Address;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsAddressMapper {
    MsAddressMapper INSTANCE = Mappers.getMapper(MsAddressMapper.class);

    AddressDTO toDto(Address entity);

    Address toVo(AddressDTO dto, String memberId);
}