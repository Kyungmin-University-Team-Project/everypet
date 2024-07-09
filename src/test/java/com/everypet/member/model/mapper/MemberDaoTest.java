package com.everypet.member.model.mapper;

import com.everypet.global.config.DatabaseConfig;
import com.everypet.member.mapper.MemberMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {DatabaseConfig.class})
public class MemberDaoTest {

    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void selectMemberId() {
        System.out.println(memberMapper.selectMemberByMemberId("user"));
    }
}
