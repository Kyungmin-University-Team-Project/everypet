package com.everypet.global.auth.jwt.filter;

import com.everypet.global.auth.util.CookieManager;
import com.everypet.global.auth.util.JWTManager;
import com.everypet.global.auth.util.TokenExpirationTime;
import com.everypet.member.model.dto.SignupDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTManager jwtManager;
    private final CookieManager cookieManager;

    // access 토큰 만료시간
    private Long accessTime = TokenExpirationTime.ACCESS_TIME;

    // refresh 토큰 만료시간
    private Long refreshTime = TokenExpirationTime.REFRESH_TIME;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            SignupDTO member = objectMapper.readValue(request.getInputStream(), SignupDTO.class);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(member.getMemberId(), member.getMemberPwd());

            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 인증 성공시 실행되는 메소드
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

        // 유저 정보
        String memberId = authentication.getName();

        // 권한 정보 추출
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        // 토큰 생성
        String access = jwtManager.createJwt("access", memberId, roles, accessTime);
        String refresh = jwtManager.createJwt("refresh", memberId, roles, refreshTime);

        // Refresh token 저장
        jwtManager.addRefreshToken(memberId, refresh, refreshTime);

        // 응답 설정
        response.setHeader("access", access);
        response.addCookie(cookieManager.createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    // 인증 실패시 실행되는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(401);
    }

}