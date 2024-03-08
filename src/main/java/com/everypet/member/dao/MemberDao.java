package com.everypet.member.dao;

import com.everypet.member.domain.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

public interface MemberDao {
    List<Member> getMemberAll();

    Member getMember(String member_id);
}
