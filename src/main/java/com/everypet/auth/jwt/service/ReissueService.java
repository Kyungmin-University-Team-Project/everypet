package com.everypet.auth.jwt.service;

import com.everypet.auth.jwt.data.dao.RefreshTokenMapper;
import com.everypet.auth.jwt.util.CookieFactory;
import com.everypet.auth.jwt.util.JWTManager;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTManager jwtManager;
    private final RefreshTokenMapper refreshTokenMapper;
    private final CookieFactory cookieFactory;
    public ResponseEntity<?> reissueAccessToken(HttpServletRequest request, HttpServletResponse response) {
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
            jwtManager.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtManager.getCategory(refresh);

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

        String memberId = jwtManager.getUsername(refresh);
        String role = jwtManager.getRole(refresh);

        //make new JWT
        String newAccess = jwtManager.createJwt("access", memberId, role, 600000L);
        String newRefresh = jwtManager.createJwt("refresh", memberId, role, 86400000L);

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshTokenMapper.deleteByRefreshToken(refresh);
        jwtManager.addRefreshToken(memberId, newRefresh, 86400000L);

        //response
        response.setHeader("access", newAccess);
        response.addCookie(cookieFactory.createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
