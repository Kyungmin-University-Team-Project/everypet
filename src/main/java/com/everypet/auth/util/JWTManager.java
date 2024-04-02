package com.everypet.auth.util;

import com.everypet.auth.jwt.data.dao.RefreshTokenMapper;
import com.everypet.auth.jwt.data.domain.RefreshToken;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTManager {
    private SecretKey secretKey;
    private final RefreshTokenMapper refreshTokenMapper;

    public JWTManager(@Value("${spring.jwt.secret}")String secret, RefreshTokenMapper refreshTokenMapper) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.refreshTokenMapper = refreshTokenMapper;
    }

    public String getUsername(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    public String getRole(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public String getCategory(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String createJwt(String category, String username, String role, Long expiredMs) {

        return Jwts.builder()
                .claim("category", category)
                .claim("username", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }
    public void addRefreshToken(String memberId, String refreshToken, Long expiredMs) {
        Date data = new Date(System.currentTimeMillis() + expiredMs);

        RefreshToken token = RefreshToken.builder()
                .memberId(memberId)
                .refreshToken(refreshToken)
                .expirationDate(data.toString())
                .build();

        refreshTokenMapper.insertRefreshToken(token);
    }
}