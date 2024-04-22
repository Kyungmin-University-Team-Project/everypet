package com.everypet.member.data.dao;

import com.everypet.member.data.domain.Address;
import com.everypet.member.data.domain.Member;
import com.everypet.member.data.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    List<Member> selectMemberAll();
    int insertMember(MemberDTO member);
    int insertAddress(Address address);
    Optional<Member> selectMemberByMemberId(String memberId);
    Boolean existsByMemberId(String memberId);
}
