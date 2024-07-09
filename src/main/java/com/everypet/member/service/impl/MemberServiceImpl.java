package com.everypet.member.service.impl;

import com.everypet.member.mapper.MemberMapper;
import com.everypet.member.mapper.RoleMapper;
import com.everypet.member.model.dto.AddressDTO;
import com.everypet.member.model.dto.SignupDTO;
import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.Role;
import com.everypet.member.model.vo.Address;
import com.everypet.member.exception.DuplicateMemberException;
import com.everypet.member.exception.MemberIdNotFoundException;
import com.everypet.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final RoleMapper roleMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void register(SignupDTO signupDTO) {

        Member member = signupDTO.toEntity();
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

        roleMapper.insertRole(Role.builder()
                .memberId(member.getMemberId())
                .authorities("ROLE_USER")
                .build());
    }

    @Override
    public void addressRegister(AddressDTO address, String memberId) {

        Address addressEntity = address.toEntity(memberId);

        memberMapper.insertAddress(addressEntity);
    }


    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId));

        // 사용자 권한 select해서 받아온 List<String> 객체 주입
        member.setAuthorities(roleMapper.selectAuthByMemberId(memberId));

        return member;
    }
}