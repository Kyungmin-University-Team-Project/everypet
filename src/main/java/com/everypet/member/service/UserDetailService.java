package com.everypet.member.service;

import com.everypet.member.data.dao.MemberMapper;
import com.everypet.member.data.dao.RoleMapper;
import com.everypet.member.data.domain.Member;
import com.everypet.member.exception.MemberIdNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public UserDetails loadUserByUsername(String memberId) {

        Member member = memberMapper.selectMemberByMemberId(memberId).orElseThrow(() -> new MemberIdNotFoundException(memberId));

        // 사용자 권한 select해서 받아온 List<String> 객체 주입
        member.setAuthorities(roleMapper.selectAuthByMemberId(memberId));

        return member;
    }
}