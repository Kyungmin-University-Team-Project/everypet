package com.everypet.member.service.impl;

import com.everypet.member.exception.AddressLimitExceededException;
import com.everypet.member.mapper.MsAddressMapper;
import com.everypet.member.model.dao.AddressMapper;
import com.everypet.member.model.dto.address.AddressRegisterDTO;
import com.everypet.member.model.dto.address.AddressUpdateDTO;
import com.everypet.member.model.vo.Address;
import com.everypet.member.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    @Value("${address.limit}")
    private int addressLimit;

    private final AddressMapper addressMapper;

    @Override
    public List<Address> getAddressByMemberId(String memberId) {
        return addressMapper.selectAddressByMemberId(memberId);
    }

    @Override
    public void addressRegister(AddressRegisterDTO address, String memberId) {

        if(addressMapper.findAddressCountByMemberId(memberId) >= addressLimit)
            throw new AddressLimitExceededException("주소는 최대 " + addressLimit + "개까지 등록 가능합니다.");

        Address addressEntity = MsAddressMapper.INSTANCE.toVo(address, memberId);

        int rowAffected = addressMapper.insertAddress(addressEntity);

        if (rowAffected == 0)
            throw new IllegalArgumentException("주소 추가에 실패했습니다.");

    }

    @Override
    public void addressUpdate(AddressUpdateDTO dto, String memberId) {

        List<Address> addressList = addressMapper.selectAddressByMemberId(memberId);
        Address address = MsAddressMapper.INSTANCE.toVo(dto, memberId);

        // 기본 배송지가 Y인 경우, 기존 기본 배송지를 N으로 변경
        if (dto.getDefaultYn() == 'Y') {
            for (Address a : addressList) {
                a.setDefaultYn('N');
                addressMapper.updateAddress(a);
            }
        }
        
        int rowsAffected = addressMapper.updateAddress(address);

        if (rowsAffected == 0)
            throw new IllegalArgumentException("주소 수정에 실패했습니다.");


    }

    @Override
    public void addressDelete(Long addressId, String memberId) {

        Address address = MsAddressMapper.INSTANCE.toVo(addressId, memberId);

        int rowAffected = addressMapper.deleteAddress(address);

        if (rowAffected == 0)
            throw new IllegalArgumentException("주소 삭제에 실패했습니다.");

    }
}