package com.everypet.member.model.dao;

import com.everypet.member.model.dto.member.FindIdDTO;
import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.PasswordRecovery;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    int insertMember(Member member);
    Optional<Member> selectMemberByMemberId(String memberId);
    boolean existsByMemberId(String memberId);
    void updatePassword(Member member);
    void deleteMember(Member member);
    void insertPasswordRecovery(PasswordRecovery passwordRecovery);
    PasswordRecovery selectPwdQuestion(String memberId);
    List<String> selectMemberByEmail(FindIdDTO dto);
}
