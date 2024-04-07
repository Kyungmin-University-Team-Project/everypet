package com.everypet.auth.oauth2.handler;

import com.everypet.auth.oauth2.data.dto.CustomOAuth2User;
import com.everypet.auth.util.CookieManager;
import com.everypet.auth.util.JWTManager;
import com.everypet.auth.util.TokenExpirationTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // access 토큰 만료시간
    private Long accessTime = TokenExpirationTime.ACCESS_TIME;

    // refresh 토큰 만료시간
    private Long refreshTime = TokenExpirationTime.REFRESH_TIME;

    private final JWTManager jwtManager;
    private final CookieManager cookieManager;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getMemberId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // 토큰 생성
        String access = jwtManager.createJwt("access", username, role, accessTime);
        String refresh = jwtManager.createJwt("refresh", username, role, refreshTime);

        // Refresh token 저장
        jwtManager.addRefreshToken(username, refresh, refreshTime);

        response.setHeader("access", access);
        response.addCookie(cookieManager.createCookie("refresh", refresh));
        response.sendRedirect("http://localhost:3000/");
    }

}
