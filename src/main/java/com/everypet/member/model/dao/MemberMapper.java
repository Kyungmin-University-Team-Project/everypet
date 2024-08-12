package com.everypet.member.model.dao;

import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.Address;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberMapper {
    int insertMember(Member member);
    int insertAddress(Address address);
    Optional<Member> selectMemberByMemberId(String memberId);
    Boolean existsByMemberId(String memberId);
    void updatePassword(Member member);
    //boolean existsNameAndEmail(String name, String email);
}
