package com.everypet.member.mapper;

import com.everypet.member.model.vo.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    Integer insertRole(Role role);
    List<String> selectAuthByMemberId(String memberId);
}
