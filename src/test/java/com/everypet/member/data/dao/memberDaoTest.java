package com.everypet.member.data.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {com.everypet.common.config.DatabaseConfig.class})
//@ContextConfiguration(locations = "classpath:WEB-INF/spring/applicationContext.xml")
public class memberDaoTest {

    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void selectMemberId() {
        System.out.println(memberMapper.selectMemberByMemberId("user"));
    }
}
