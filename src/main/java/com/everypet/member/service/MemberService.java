package com.everypet.member.service;

import com.everypet.member.domain.Member;

import java.util.List;

public interface MemberService {
    List<Member> getMemberAll();

    Member getMember(String member_id);
}
