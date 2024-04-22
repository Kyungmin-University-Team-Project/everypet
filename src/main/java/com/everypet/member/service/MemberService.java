package com.everypet.member.service;

import com.everypet.member.data.dto.AddressDTO;
import com.everypet.member.data.dto.MemberDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface MemberService extends UserDetailsService {
    void register(MemberDTO memberDTO);
    void addressRegister(AddressDTO addressDTO);
}
