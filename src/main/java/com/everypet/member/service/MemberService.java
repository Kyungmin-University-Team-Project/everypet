package com.everypet.member.service;

import com.everypet.member.model.dto.*;
import com.everypet.member.model.vo.Member;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface MemberService extends UserDetailsService {
    void register(SignupDTO signupData);
    void changePassword(Member member, PasswordChageDTO passwordChageData);
    MemberInfoDTO getMemberInfoByMemberId(String memberId);
    void deleteMember(Member member, DeleteMemberDTO deleteData);
    void passwordReset(PasswordResetDTO pwdResetData);
}