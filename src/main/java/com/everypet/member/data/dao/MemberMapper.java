package com.everypet.member.data.dao;

import com.everypet.member.data.domain.Member;
import com.everypet.member.data.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    List<Member> selectMemberAll();
    Optional<Member> selectMemberByMemberId(String memberId);
}
