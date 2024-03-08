package com.everypet.member.dao.impl;

import com.everypet.member.dao.MemberDao;
import com.everypet.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class MemberDaoImpl implements MemberDao {

    private final SqlSessionTemplate sql;

    public List<Member> getMemberAll() {
        return sql.selectList("member.selectMemberAll");
    }

    public Member getMember(String member_id) {
        return sql.selectOne("member.selectMemberById", member_id);
    }

}
