package com.everypet.member.service;

import com.everypet.member.model.dto.address.AddressRegisterDTO;
import com.everypet.member.model.dto.address.AddressUpdateDTO;
import com.everypet.member.model.vo.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAddressByMemberId(String memberId);
    void addressRegister(AddressRegisterDTO address, String memberId);
    void addressUpdate(AddressUpdateDTO address, String memberId);
    void addressDelete(Long addressId, String memberId);
}
