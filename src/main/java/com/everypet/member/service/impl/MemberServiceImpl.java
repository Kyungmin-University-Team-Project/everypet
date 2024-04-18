package com.everypet.member.service.impl;

import com.everypet.member.data.dao.MemberMapper;
import com.everypet.member.data.dao.RoleMapper;
import com.everypet.member.data.domain.Address;
import com.everypet.member.data.domain.Member;
import com.everypet.member.data.domain.Role;
import com.everypet.member.data.dto.AddressDTO;
import com.everypet.member.data.dto.MemberDTO;
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

    @Override
    public void addressRegister(AddressDTO addressDTO) {

        Address address = Address.builder()
                .memberId(addressDTO.getMemberId())
                .address(addressDTO.getAddress())
                .receiver(addressDTO.getReceiver())
                .phone(addressDTO.getPhone())
                .request(addressDTO.getRequest())
                .defaultYn(addressDTO.getDefaultYn())
                .build();

        memberMapper.insertAddress(address);
    }


    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        Member member = memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId));

        // 사용자 권한 select해서 받아온 List<String> 객체 주입
        member.setAuthorities(roleMapper.selectAuthByMemberId(memberId));

        return member;
    }
}