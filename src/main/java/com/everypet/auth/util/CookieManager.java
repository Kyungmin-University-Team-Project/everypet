package com.everypet.auth.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;

@Component
public class CookieManager {

    public Cookie createCookie(String key, String value) {

        int time = Math.toIntExact(TokenExpirationTime.REFRESH_TIME);

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(time);
        //cookie.setSecure(true);
        //cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
