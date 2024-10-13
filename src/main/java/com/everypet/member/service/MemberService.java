package com.everypet.member.service;

import com.everypet.member.model.dto.member.*;
import com.everypet.member.model.vo.Member;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface MemberService extends UserDetailsService {
    void register(SignupDTO signupData);
    void changePassword(Member member, PasswordChageDTO passwordChageData, HttpServletRequest request);
    MemberInfoDTO getMemberInfoByMemberId(String memberId);
    void deleteMember(Member member, DeleteMemberDTO deleteData, HttpServletRequest request);
    void passwordReset(PasswordResetDTO pwdResetData, HttpServletRequest request);
    List<String> findMemberId(FindIdDTO findIdData, HttpServletRequest request);
}