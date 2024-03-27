package com.everypet.util.jwt;

import com.everypet.member.data.domain.Member;
import com.everypet.member.data.dto.MemberDTO;
import com.everypet.util.jwt.factory.JWTFactory;
import com.everypet.util.oauth2.dto.CustomOAuth2User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JWTFilter$ extends OncePerRequestFilter {

    private final JWTFactory jwtFactory;

    public JWTFilter$(JWTFactory jwtFactory) {
        this.jwtFactory = jwtFactory;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        //cookie들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    authorization = cookie.getValue();
                }
            }
        }

        //Authorization 헤더 검증
        if (authorization == null) {

            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        // 쿠키로 받은 토큰 && 헤더로 받은 토큰 분리
        String token;
        String[] isSplittable = authorization.split(" ");

        if (isSplittable.length > 1) {
            token = isSplittable[1];

            //토큰 소멸 시간 검증
            if (jwtFactory.isExpired(token)) {

                filterChain.doFilter(request, response);

                //조건이 해당되면 메소드 종료 (필수)
                return;
            }
            //토큰에서 username과 role 획득
            String username = jwtFactory.getUsername(token);
            List<String> role = new ArrayList<>(
                    Arrays.asList(jwtFactory.getRole(token))
            );

            //Member를 생성하여 값 set
            Member member = new Member();
            member.setMemberId(username);
            member.setMemberPwd("temppassword");
            member.setAuthorities(role);

            //스프링 시큐리티 인증 토큰 생성
            Authentication authToken = new UsernamePasswordAuthenticationToken(member, null,
                    member.getAuthorities());
            //세션에 사용자 등록
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        } else {
            token = authorization;

            //토큰 소멸 시간 검증
            if (jwtFactory.isExpired(token)) {

                filterChain.doFilter(request, response);

                //조건이 해당되면 메소드 종료 (필수)
                return;
            }

            //토큰에서 username과 role 획득
            String username = jwtFactory.getUsername(token);
            String role = jwtFactory.getRole(token);

            MemberDTO member = new MemberDTO();
            member.setMemberId(username);
            member.setRole(role);

            CustomOAuth2User customOAuth2User = new CustomOAuth2User(member);

            //스프링 시큐리티 인증 토큰 생성
            Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
            //세션에 사용자 등록
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        }
    }
}