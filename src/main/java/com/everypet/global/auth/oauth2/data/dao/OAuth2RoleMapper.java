package com.everypet.global.auth.oauth2.data.dao;

import com.everypet.global.auth.oauth2.data.domain.OAuth2Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OAuth2RoleMapper {
    Integer insertRole(OAuth2Role role);
    List<String> selectAuthByMemberId(String memberId);
}
