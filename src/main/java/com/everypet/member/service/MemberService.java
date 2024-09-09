package com.everypet.member.service;

import com.everypet.member.model.dto.member.*;
import com.everypet.member.model.vo.Member;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface MemberService extends UserDetailsService {
    void register(SignupDTO signupData);
    void changePassword(Member member, PasswordChageDTO passwordChageData);
    MemberInfoDTO getMemberInfoByMemberId(String memberId);
    void deleteMember(Member member, DeleteMemberDTO deleteData);
    void passwordReset(PasswordResetDTO pwdResetData);
    List<String> findId(FindIdDTO findIdData);
}