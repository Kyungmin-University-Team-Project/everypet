package com.everypet.auth.jwt.data.dao;

import com.everypet.auth.jwt.data.domain.RefreshToken;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RefreshTokenMapper {
    Boolean existsByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);
    void insertRefreshToken(RefreshToken refreshToken);
    void deleteByMemberId(String memberId);
}
