package com.everypet.member.service;

import com.everypet.member.model.dto.MemberInfoDTO;
import com.everypet.member.model.dto.PasswordChageDTO;
import com.everypet.member.model.dto.SignupDTO;
import com.everypet.member.model.vo.Member;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface MemberService extends UserDetailsService {
    void register(SignupDTO signupDTO);
    void changePassword(Member member, PasswordChageDTO password);
    MemberInfoDTO getMemberInfoByMemberId(String memberId);
}