package com.everypet.global.auth.oauth2.data.dao;

import com.everypet.global.auth.oauth2.data.domain.OAuth2Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface OAuth2MemberMapper {
    Integer insertOAuth2Member(OAuth2Member oauth2Member);
    void updateOAuth2Member(OAuth2Member oauth2Member);
    Optional<OAuth2Member> selectOAuth2MemberByMemberId(String memberId);
}