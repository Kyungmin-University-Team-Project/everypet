package com.everypet.member.service;

import com.everypet.member.data.dao.MemberMapper;
import com.everypet.member.data.dao.RoleMapper;
import com.everypet.member.data.domain.Role;
import com.everypet.member.data.dto.MemberDTO;
import com.everypet.member.exception.DuplicateMemberException;
import com.everypet.member.service.serviceInterface.MemberService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final RoleMapper roleMapper;
    private final PasswordEncoder passwordEncoder;

    public MemberServiceImpl(MemberMapper memberMapper, RoleMapper roleMapper, PasswordEncoder passwordEncoder) {
        this.memberMapper = memberMapper;
        this.roleMapper = roleMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void register(MemberDTO member) {

        String memberId = member.getMemberId();
        String memberPwd = member.getMemberPwd();

        Boolean isExist = memberMapper.existsByMemberId(memberId);

        // 이미 존재하는 아이디라면
        if (isExist) {
            throw new DuplicateMemberException(member.getMemberId());
        }

        // 비밀번호 암호화
        member.setMemberPwd(passwordEncoder.encode(memberPwd));

        memberMapper.insertMember(member);
        roleMapper.insertRole(Role.builder()
                .memberId(member.getMemberId())
                .authorities("ROLE_USER")
                .build());
    }
}