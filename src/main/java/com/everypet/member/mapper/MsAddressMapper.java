package com.everypet.member.mapper;

import com.everypet.member.model.dto.address.AddressRegisterDTO;
import com.everypet.member.model.dto.address.AddressUpdateDTO;
import com.everypet.member.model.dto.address.SignupAddressDTO;
import com.everypet.member.model.vo.Address;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsAddressMapper {
    MsAddressMapper INSTANCE = Mappers.getMapper(MsAddressMapper.class);

    Address toVo(Long addressId, String memberId);

    Address toVo(AddressRegisterDTO dto, String memberId);

    Address toVo(SignupAddressDTO dto, String memberId, String receiver, String phone, String request);

    Address toVo(AddressUpdateDTO dto, String memberId);
}