package com.everypet.member.service.impl;

import com.everypet.global.util.PasswordGenerator;
import com.everypet.mail.model.constant.Purpose;
import com.everypet.mail.service.EmailService;
import com.everypet.member.exception.DuplicateMemberException;
import com.everypet.member.exception.InvalidVerificationCodeException;
import com.everypet.member.exception.MemberIdNotFoundException;
import com.everypet.member.mapper.MsAddressMapper;
import com.everypet.member.mapper.MsMemberInfoMapper;
import com.everypet.member.mapper.MsSignupMapper;
import com.everypet.member.model.dao.AddressMapper;
import com.everypet.member.model.dao.MemberMapper;
import com.everypet.member.model.dao.RoleMapper;
import com.everypet.member.model.dto.member.*;
import com.everypet.member.model.vo.Address;
import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.Role;
import com.everypet.member.service.MemberService;
import com.everypet.point.service.PointService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final Logger log = LogManager.getLogger(MemberServiceImpl.class);
    private final MemberMapper memberMapper;
    private final AddressMapper addressMapper;
    private final RoleMapper roleMapper;

    private final PasswordEncoder passwordEncoder;
    private final PointService pointService;
    private final EmailService emailService;

    @Value("${email.template.registration}")
    private String signupTemplate;

    @Value("${email.template.password-reset}")
    private String temporaryPwdTemplate;

    @Override
    public void register(SignupDTO signupDTO) {

        Member member = MsSignupMapper.INSTANCE.toVo(signupDTO);
        Address address = MsAddressMapper.INSTANCE.toVo(signupDTO.getAddress(), member.getMemberId(), member.getName(), member.getPhone(), "문 앞", 'Y');

        String memberId = member.getMemberId();
        String memberPwd = member.getMemberPwd();

        // 이미 존재하는 아이디라면
        if (memberMapper.existsByMemberId(memberId)) {
            throw new DuplicateMemberException(member.getMemberId());
        }

        // 추천인을 작성 했을 경우 실행
        if (signupDTO.getReferrer() != null) {
            // 해당 추천인 아이디가 존재하지 않을 경우
            try {
                Member user = memberMapper.selectMemberByMemberId(signupDTO.getReferrer()).orElseThrow(() -> new MemberIdNotFoundException(signupDTO.getReferrer()));
                pointService.accumulateReferralPoints(user);
            } catch (MemberIdNotFoundException e) {
                log.error("추천인 아이디가 존재하지 않습니다.");
            }
        }

        // 비밀번호 암호화
        member.setMemberPwd(passwordEncoder.encode(memberPwd));

        memberMapper.insertMember(member);
        addressMapper.insertAddress(address);

        // 포인트 적립
        pointService.accumulateSignupPoints(member);

        List<String> email = Collections.singletonList(signupDTO.getEmail());

        emailService.sendEmail(email, Purpose.SIGNUP_WELCOME.getSubject(), signupTemplate, member.getName());

        roleMapper.insertRole(Role.of(memberId, "ROLE_USER"));
    }

    @Override
    public void changePassword(Member member, PasswordChageDTO passwordChage, HttpServletRequest request) {

        Member user = memberMapper.selectMemberByMemberId(member.getMemberId()).orElseThrow(() -> new MemberIdNotFoundException(member.getMemberId()));

        if (!passwordEncoder.matches(passwordChage.getOldPassword(), user.getMemberPwd())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        user.setMemberPwd(passwordEncoder.encode(passwordChage.getNewPassword()));

        memberMapper.updatePassword(user);
    }

    @Override
    public MemberInfoDTO getMemberInfoByMemberId(String memberId) {
        return MsMemberInfoMapper.INSTANCE.toDto(memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId)));
    }

    @Override
    public void deleteMember(Member member, DeleteMemberDTO deleteData, HttpServletRequest request) {
        memberMapper.deleteMember(member);
    }

    @Override
    public void passwordReset(PasswordResetDTO pwdResetData, HttpServletRequest request) {

        Member member = memberMapper.selectMemberByMemberId(pwdResetData.getMemberId()).orElseThrow(() -> new MemberIdNotFoundException(pwdResetData.getMemberId()));

        // 임시 비밀번호 생성
        String newPwd = PasswordGenerator.generateRandomPassword(12);

        member.setMemberPwd(passwordEncoder.encode(newPwd));

        memberMapper.updatePassword(member);

        // 임시 비밀번호 발송
        emailService.sendEmail(Collections.singletonList(member.getEmail()), Purpose.TEMPORARY_PASSWORD.getSubject(), temporaryPwdTemplate, newPwd);

    }

    @Override
    public List<String> findMemberId(FindIdDTO dto, HttpServletRequest request) {

        Member member = MsSignupMapper.INSTANCE.toVo(dto);

        List<String> members = memberMapper.selectMemberByEmail(member);

        if(members.isEmpty()) {
            throw new InvalidVerificationCodeException("이메일 또는 이름이 일치하는 회원이 없습니다.");
        }

        return members;
    }

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId));

        // 사용자 권한 select해서 받아온 List<String> 객체 주입
        member.setAuthorities(roleMapper.selectAuthByMemberId(memberId));

        return member;
    }

}