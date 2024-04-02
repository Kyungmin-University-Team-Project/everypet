package com.everypet.auth.jwt.repository;

import com.everypet.auth.jwt.data.domain.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    // Optional<RefreshToken> findByToken(String token);

    // Optional<RefreshToken> findByAuthId(String authId);
}
