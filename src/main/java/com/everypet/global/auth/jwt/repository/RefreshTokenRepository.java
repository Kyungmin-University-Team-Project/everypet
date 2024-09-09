package com.everypet.global.auth.jwt.repository;

import com.everypet.global.auth.jwt.model.vo.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    RefreshToken findByRefreshToken(String refreshToken);
}
