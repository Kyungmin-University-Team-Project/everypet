package com.everypet.member.data.dao;

import com.everypet.member.data.domain.Member;
import com.everypet.member.data.vo.Address;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberMapper {
    //List<Member> selectMemberAll();
    int insertMember(Member member);
    int insertAddress(Address address);
    Optional<Member> selectMemberByMemberId(String memberId);
    Boolean existsByMemberId(String memberId);
}
