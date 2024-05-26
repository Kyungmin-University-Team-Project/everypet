package com.everypet.global.auth.jwt.data.repository;

import com.everypet.global.auth.jwt.data.domain.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    RefreshToken findByRefreshToken(String refreshToken);
}
