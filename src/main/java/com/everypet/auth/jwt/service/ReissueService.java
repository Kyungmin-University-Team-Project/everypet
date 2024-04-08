package com.everypet.auth.jwt.service;

import com.everypet.auth.jwt.data.domain.RefreshToken;
import com.everypet.auth.jwt.data.repository.RefreshTokenRepository;
import com.everypet.auth.util.CookieManager;
import com.everypet.auth.util.JWTManager;
import com.everypet.auth.util.TokenExpirationTime;
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
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieManager cookieManager;

    // access 토큰 만료시간
    private Long accessTime = TokenExpirationTime.ACCESS_TIME;

    // refresh 토큰 만료시간
    private Long refreshTime = TokenExpirationTime.REFRESH_TIME;

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

        // DB에서 해당 refresh 토큰을 찾습니다.
        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(refresh);

        // 만약 토큰이 존재하지 않는 경우
        if (refreshToken == null) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        String memberId = jwtManager.getUsername(refresh);
        String role = jwtManager.getRole(refresh);

        //make new JWT
        String newAccess = jwtManager.createJwt("access", memberId, role, accessTime);
        String newRefresh = jwtManager.createJwt("refresh", memberId, role, refreshTime);

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshTokenRepository.delete(refreshToken);
        jwtManager.addRefreshToken(memberId, newRefresh, refreshTime);

        //response
        response.setHeader("access", newAccess);
        response.addCookie(cookieManager.createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
