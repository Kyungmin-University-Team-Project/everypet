package com.everypet.member.model.dao;

import com.everypet.member.model.vo.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    int insertMember(Member member);
    Optional<Member> selectMemberByMemberId(String memberId);
    boolean existsByMemberId(String memberId);
    boolean existsByPhoneNumber(String phoneNumber);
    void updatePassword(Member member);
    void deleteMember(Member member);
    List<String> selectMemberByEmail(Member dto);
}
