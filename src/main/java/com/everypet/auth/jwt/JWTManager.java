package com.everypet.auth.jwt;

import com.everypet.auth.repository.RefreshTokenRepository;
import com.everypet.auth.vo.RefreshToken;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;


@Component
public class JWTManager {
    private SecretKey secretKey;
    private final RefreshTokenRepository refreshTokenRepository;

    public JWTManager(@Value("${spring.jwt.secret}") String secret, RefreshTokenRepository refreshTokenRepository) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String getUsername(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    public List<String> getRoles(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("roles", List.class);
    }

    public String getCategory(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String createJwt(String category, String username, List<String> roles, Long expiredMs) {
        return Jwts.builder()
                .claim("category", category)
                .claim("username", username)
                // roles를 List로 저장
                .claim("roles", roles)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    public void addRefreshToken(String memberId, String refreshToken, Long expiredMs, String ip) {
        RefreshToken token = RefreshToken.builder()
                .memberId(memberId + ":" + ip)
                .refreshToken(refreshToken)
                .expirationDate(expiredMs / 1000)
                .build();

        refreshTokenRepository.save(token);
    }
}
