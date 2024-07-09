package com.everypet.member.mapper;

import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.Address;
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
