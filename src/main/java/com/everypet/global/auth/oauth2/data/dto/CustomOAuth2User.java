package com.everypet.global.auth.oauth2.data.dto;

import com.everypet.member.data.dto.SignupRequestDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final SignupRequestDTO signupRequestDTO;

    public CustomOAuth2User(SignupRequestDTO signupRequestDTO) {
        this.signupRequestDTO = signupRequestDTO;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add((GrantedAuthority) () -> "ROLE_USER");

        return collection;
    }

    @Override
    public String getName() {
        return signupRequestDTO.getName();
    }

    public String getMemberId() {
        return signupRequestDTO.getMemberId();
    }

}
