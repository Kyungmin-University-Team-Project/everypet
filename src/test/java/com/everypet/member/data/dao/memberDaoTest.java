package com.everypet.member.data.dao;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.sql.DataSource;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:WEB-INF/spring/applicationContext.xml")
public class memberDaoTest {

    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void selectMemberId() {
        System.out.println(memberMapper.selectMemberByMemberId("user"));
    }
}
