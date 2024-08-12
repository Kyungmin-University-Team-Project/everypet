package com.everypet.member.service.impl;

import com.everypet.member.mapper.MsAddressMapper;
import com.everypet.member.model.dao.MemberMapper;
import com.everypet.member.model.dto.AddressDTO;
import com.everypet.member.model.vo.Address;
import com.everypet.member.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final MemberMapper memberMapper;

    @Override
    public void addressRegister(AddressDTO address, String memberId) {

        Address addressEntity = MsAddressMapper.INSTANCE.toVo(address, memberId);

        memberMapper.insertAddress(addressEntity);
    }
}
