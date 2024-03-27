package com.everypet.util.jwt.controller;

import com.everypet.util.jwt.data.dao.RefreshTokenMapper;
import com.everypet.util.jwt.data.domain.RefreshToken;
import com.everypet.util.jwt.factory.JWTFactory;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class ReissueController {

    private final JWTFactory jwtFactory;
    private final RefreshTokenMapper refreshTokenMapper;
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {

            //response status code
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        //expired check
        try {
            jwtFactory.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtFactory.getCategory(refresh);

        if (!category.equals("refresh")) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        // DB에 저장되어 있는지 확인
        Boolean isExist = refreshTokenMapper.existsByRefreshToken(refresh);
        if (!isExist) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        String username = jwtFactory.getUsername(refresh);
        String role = jwtFactory.getRole(refresh);

        //make new JWT
        String newAccess = jwtFactory.createJwt("access", username, role, 600000L);
        String newRefresh = jwtFactory.createJwt("refresh", username, role, 86400000L);

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshTokenMapper.deleteByRefreshToken(refresh);
        addRefreshToken(username, newRefresh, 86400000L);

        //response
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }
    private void addRefreshToken(String memberId, String refreshToken, Long expiredMs) {
        Date data = new Date(System.currentTimeMillis() + expiredMs);

        RefreshToken token = RefreshToken.builder()
                .memberId(memberId)
                .refreshToken(refreshToken)
                .expirationDate(data.toString())
                .build();

        refreshTokenMapper.insertRefreshToken(token);
    }
    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        //cookie.setSecure(true);
        //cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}