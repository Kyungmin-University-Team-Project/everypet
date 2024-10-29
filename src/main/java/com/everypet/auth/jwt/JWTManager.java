package com.everypet.auth.jwt;

import com.everypet.auth.repository.RefreshTokenRepository;
import com.everypet.auth.vo.RefreshToken;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
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
        String rolesStr = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("roles", String.class);
        return Arrays.asList(rolesStr.split(","));
    }

    public String getCategory(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String createJwt(String category, String username, List<String> roles, Long expiredMs) {

        String rolesStr = String.join(",", roles);

        return Jwts.builder()
                .claim("category", category)
                .claim("username", username)
                .claim("roles", rolesStr)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();

    }

    public void addRefreshToken(String memberId, String refreshToken, Long expiredMs, String ip) {

        // 한국 시간대로 설정
        //TimeZone timeZone = TimeZone.getTimeZone("Asia/Seoul");
        //SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy년MM월dd일 HH:mm:ss");
        //dateFormat.setTimeZone(timeZone);

        //Date date = new Date(System.currentTimeMillis() + expiredMs);
        //String formattedDate = dateFormat.format(date);

        RefreshToken token = RefreshToken.builder()
                .memberId(memberId + ":" + ip)
                .refreshToken(refreshToken)
                .expirationDate(expiredMs / 1000)
                .build();

        refreshTokenRepository.save(token);
    }
}