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
@ContextConfiguration(locations = "classpath:WEB-INF/spring/database-context/databaseContext.xml")
public class memberDaoTest {

    @Autowired
    DataSource dataSource;

    JdbcTemplate jdbcTemplate;

    @Before
    public void setUp() {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Test
    public void add() {
        String name = "햄스터";
        int age = 50;

        String sql = "INSERT INTO test(name, age) VALUES (?, ?)";
        this.jdbcTemplate.update(sql, name, age);
    }
}
