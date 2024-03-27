package com.everypet.util.jwt.filter;

import com.everypet.member.data.dto.MemberDTO;
import com.everypet.util.jwt.data.dao.RefreshTokenMapper;
import com.everypet.util.jwt.data.domain.RefreshToken;
import com.everypet.util.jwt.factory.JWTFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTFactory jwtFactory;
    private final RefreshTokenMapper refreshTokenMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        MemberDTO memberDTO = new MemberDTO();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            memberDTO = objectMapper.readValue(messageBody, MemberDTO.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String memberId = memberDTO.getMemberId();
        String memberPwd = memberDTO.getMemberPwd();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(memberId, memberPwd);

        return authenticationManager.authenticate(authToken);
    }

    // 인증 성공시 실행되는 메소드
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

        // 유저 정보
        String memberId = authentication.getName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        refreshTokenMapper.deleteByMemberId(memberId);

        // 토큰 생성
        String access = jwtFactory.createJwt("access", memberId, role, 600000L);
        String refresh = jwtFactory.createJwt("refresh", memberId, role, 86400000L);

        // Refresh token 저장
        addRefreshToken(memberId, refresh, 86400000L);

        // 응답 설정
        response.setHeader("access", access);
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    // 인증 실패시 실행되는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(401);
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