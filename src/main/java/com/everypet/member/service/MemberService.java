package com.everypet.member.service;

import com.everypet.member.data.dto.SignupRequestDTO;
import com.everypet.member.data.vo.Address;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface MemberService extends UserDetailsService {
    void register(SignupRequestDTO signupRequestDTO);
    void addressRegister(Address address);
}
