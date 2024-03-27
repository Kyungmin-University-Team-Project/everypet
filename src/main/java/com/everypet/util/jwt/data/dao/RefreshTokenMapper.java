package com.everypet.util.jwt.data.dao;

import com.everypet.util.jwt.data.domain.RefreshToken;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

@Mapper
public interface RefreshTokenMapper {
    Boolean existsByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);
    void insertRefreshToken(RefreshToken refreshToken);
    void deleteByMemberId(String memberId);
}
