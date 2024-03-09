package com.everypet.member.service;

import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Service
public class UserLoginFailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {

        String errorMessage = "몰루?";

        if(e instanceof AuthenticationServiceException) {
            errorMessage = "존재하지 않는 사용자입니다.";
        } else if(e instanceof BadCredentialsException) {
            errorMessage = "아이디 또는 비밀번호가 틀립니다.";
        } else if(e instanceof LockedException) {
            errorMessage = "잠긴 계정입니다.";
        } else if(e instanceof DisabledException) {
            errorMessage = "비활성된 계정입니다.";
        } else if(e instanceof AccountExpiredException) {
            errorMessage = "만료된 계정입니다.";
        } else if(e instanceof CredentialsExpiredException) {
            errorMessage = "비밀번호가 만료되었습니다.";
        }

        String encodedMessage = URLEncoder.encode(errorMessage, "UTF-8");
        response.sendRedirect(request.getContextPath() + "/signin?error=" + encodedMessage);
    }
}