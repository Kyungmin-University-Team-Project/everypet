package com.everypet.member.service.impl;

import com.everypet.global.util.mail.service.EmailService;
import com.everypet.member.exception.DuplicateMemberException;
import com.everypet.member.exception.InvalidVerificationCodeException;
import com.everypet.member.exception.MemberIdNotFoundException;
import com.everypet.member.mapper.MsMemberInfoMapper;
import com.everypet.member.mapper.MsSignupMapper;
import com.everypet.member.model.dao.MemberMapper;
import com.everypet.member.model.dao.RoleMapper;
import com.everypet.member.model.dto.*;
import com.everypet.member.model.vo.Address;
import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.PasswordRecovery;
import com.everypet.member.model.vo.Role;
import com.everypet.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final RoleMapper roleMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${email.subject.registration}")
    private String signupSubject;

    @Value("${email.template.registration}")
    private String signupTemplate;

    @Override
    public void register(SignupDTO signupDTO) {

        Member member = MsSignupMapper.INSTANCE.toVo(signupDTO);
        Address address = signupDTO.getAddress().toEntity(signupDTO);
        PasswordRecovery passwordRecovery = signupDTO.getPasswordRecovery().toEntity(signupDTO.getMemberId());

        String memberId = member.getMemberId();
        String memberPwd = member.getMemberPwd();

        // 이메일 인증 코드 확인
        if(!emailService.verifyCode(signupDTO.getVerification()))
            throw new InvalidVerificationCodeException("회원가입 인증 코드가 일치하지 않습니다.");

        // 이미 존재하는 아이디라면
        if (memberMapper.existsByMemberId(memberId)) {
            throw new DuplicateMemberException(member.getMemberId());
        }

        // 비밀번호 암호화
        member.setMemberPwd(passwordEncoder.encode(memberPwd));

        memberMapper.insertMember(member);
        memberMapper.insertAddress(address);
        memberMapper.insertPasswordRecovery(passwordRecovery);

        List<String> email = Collections.singletonList(signupDTO.getEmail());

        emailService.sendEmail(email, signupSubject, signupTemplate, member.getName());
        emailService.deleteCode(signupDTO.getVerification());

        roleMapper.insertRole(Role.builder()
                .memberId(member.getMemberId())
                .authorities("ROLE_USER")
                .build());
    }

    @Override
    public void changePassword(Member member, PasswordChageDTO passwordChage) {

        Member user = memberMapper.selectMemberByMemberId(member.getMemberId()).orElseThrow(() -> new MemberIdNotFoundException(member.getMemberId()));

        if (!emailService.verifyCode(passwordChage.getVerification())) {
            throw new InvalidVerificationCodeException("비밀번호 변경 인증 코드가 일치하지 않습니다.");
        }

        if (!passwordEncoder.matches(passwordChage.getOldPassword(), user.getMemberPwd())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        user.setMemberPwd(passwordEncoder.encode(passwordChage.getNewPassword()));
        emailService.deleteCode(passwordChage.getVerification());

        memberMapper.updatePassword(user);
    }

    @Override
    public MemberInfoDTO getMemberInfoByMemberId(String memberId) {
        return MsMemberInfoMapper.INSTANCE.toDto(memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId)));
    }

    @Override
    public void deleteMember(Member member, DeleteMemberDTO deleteData) {

        if(!emailService.verifyCode(deleteData.getVerification())) {
            throw new InvalidVerificationCodeException("회원 탈퇴 인증 코드가 일치하지 않습니다.");
        }

        memberMapper.deleteMember(member);

    }

    @Override
    public void passwordReset(PasswordResetDTO pwdResetData) {

        Member member = memberMapper.selectMemberByMemberId(pwdResetData.getMemberId()).orElseThrow(() -> new MemberIdNotFoundException(pwdResetData.getMemberId()));

        PasswordRecovery passwordRecovery = memberMapper.selectPwdQuestion(member.getMemberId());

        if (!passwordRecovery.getAnswer().equals(pwdResetData.getAnswer())) {
            throw new IllegalArgumentException("비밀번호 찾기 질문의 답이 일치하지 않습니다.");
        }

        if (!emailService.verifyCode(pwdResetData.getVerification())) {
            throw new InvalidVerificationCodeException("비밀번호 초기화 인증 코드가 일치하지 않습니다.");
        }

        member.setMemberPwd(passwordEncoder.encode(pwdResetData.getNewPassword()));
        emailService.deleteCode(pwdResetData.getVerification());

        memberMapper.updatePassword(member);
    }

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId));

        // 사용자 권한 select해서 받아온 List<String> 객체 주입
        member.setAuthorities(roleMapper.selectAuthByMemberId(memberId));

        return member;
    }

}