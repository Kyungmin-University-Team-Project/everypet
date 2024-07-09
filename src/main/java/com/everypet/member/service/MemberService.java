package com.everypet.member.service;

import com.everypet.member.model.dto.AddressDTO;
import com.everypet.member.model.dto.SignupDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface MemberService extends UserDetailsService {
    void register(SignupDTO signupDTO);
    void addressRegister(AddressDTO address, String memberId);
}
