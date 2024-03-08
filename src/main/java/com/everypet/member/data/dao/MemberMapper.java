package com.everypet.member.data.dao;

import com.everypet.member.data.domain.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
    List<Member> selectMemberAll();
    Member selectMemberById(String member_id);
}
