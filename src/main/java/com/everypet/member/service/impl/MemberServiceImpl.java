package com.everypet.member.service.impl;

import com.everypet.global.util.mail.service.EmailService;
import com.everypet.member.exception.DuplicateMemberException;
import com.everypet.member.exception.MemberIdNotFoundException;
import com.everypet.member.mapper.MsMemberInfoMapper;
import com.everypet.member.mapper.MsSignupMapper;
import com.everypet.member.model.dao.MemberMapper;
import com.everypet.member.model.dao.RoleMapper;
import com.everypet.member.model.dto.MemberInfoDTO;
import com.everypet.member.model.dto.PasswordChageDTO;
import com.everypet.member.model.dto.SignupDTO;
import com.everypet.member.model.vo.Address;
import com.everypet.member.model.vo.Member;
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

    @Value("${error.password.mismatch}")
    private String passwordMismatchError;

    @Override
    public void register(SignupDTO signupDTO) {

        Member member = MsSignupMapper.INSTANCE.toVo(signupDTO);
        Address address = signupDTO.getAddress().toEntity(signupDTO);

        String memberId = member.getMemberId();
        String memberPwd = member.getMemberPwd();

        // 이미 존재하는 아이디라면
        if (memberMapper.existsByMemberId(memberId)) {
            throw new DuplicateMemberException(member.getMemberId());
        }

        // 비밀번호 암호화
        member.setMemberPwd(passwordEncoder.encode(memberPwd));

        memberMapper.insertMember(member);
        memberMapper.insertAddress(address);

        List<String> email = Collections.singletonList(signupDTO.getEmail());

        emailService.sendEmail(email, signupSubject, signupTemplate, member.getName());

        roleMapper.insertRole(Role.builder()
                .memberId(member.getMemberId())
                .authorities("ROLE_USER")
                .build());
    }

    @Override
    public void changePassword(Member member, PasswordChageDTO passwordChage) {

        Member user = memberMapper.selectMemberByMemberId(member.getMemberId()).orElseThrow(() -> new MemberIdNotFoundException(member.getMemberId()));

        if (!passwordEncoder.matches(passwordChage.getOldPassword(), user.getMemberPwd())) {
            throw new IllegalArgumentException(passwordMismatchError);
        }

        user.setMemberPwd(passwordEncoder.encode(passwordChage.getNewPassword()));

        memberMapper.updatePassword(user);
    }

    @Override
    public MemberInfoDTO getMemberInfoByMemberId(String memberId) {
        return MsMemberInfoMapper.INSTANCE.toDto(memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId)));
    }

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId));

        // 사용자 권한 select해서 받아온 List<String> 객체 주입
        member.setAuthorities(roleMapper.selectAuthByMemberId(memberId));

        return member;
    }

}