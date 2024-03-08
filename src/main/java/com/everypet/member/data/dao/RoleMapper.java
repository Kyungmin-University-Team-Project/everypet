package com.everypet.member.data.dao;

import com.everypet.member.data.domain.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    int insertRole(Role role);
    List<String> selectAuthByMemberId(String memberId);
}
