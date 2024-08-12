package com.everypet.member.service;

import com.everypet.member.model.dto.AddressDTO;

public interface AddressService {
    void addressRegister(AddressDTO address, String memberId);
}
