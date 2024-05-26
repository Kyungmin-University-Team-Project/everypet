package com.everypet.global.auth.oauth2.service;

import com.everypet.global.auth.oauth2.data.dao.OAuth2MemberMapper;
import com.everypet.global.auth.oauth2.data.dao.OAuth2RoleMapper;
import com.everypet.global.auth.oauth2.data.domain.OAuth2Member;
import com.everypet.global.auth.oauth2.data.domain.OAuth2Role;
import com.everypet.global.auth.oauth2.data.dto.CustomOAuth2User;
import com.everypet.global.auth.oauth2.data.dto.response.GoogleResponse;
import com.everypet.global.auth.oauth2.data.dto.response.NaverResponse;
import com.everypet.global.auth.oauth2.data.dto.response.OAuth2Response;
import com.everypet.member.data.dto.MemberDTO;
import com.everypet.member.exception.MemberIdNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final OAuth2MemberMapper oAuth2MemberMapper;
    private final OAuth2RoleMapper oAuth2RoleMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        System.out.println(oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else {

            return null;
        }

        // 리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듬
        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();

        OAuth2Member existData;

        try {
            existData =
                    oAuth2MemberMapper.selectOAuth2MemberByMemberId(username).orElseThrow(() -> new MemberIdNotFoundException(username));
        } catch (MemberIdNotFoundException e) {
            OAuth2Member oauth2Member = OAuth2Member.builder()
                    .memberId(username)
                    .name(oAuth2Response.getName())
                    .email(oAuth2Response.getEmail()).build();

            OAuth2Role role = OAuth2Role.builder()
                    .memberId(username)
                    .authorities("ROLE_USER").build();

            oAuth2MemberMapper.insertOAuth2Member(oauth2Member);
            oAuth2RoleMapper.insertRole(role);

            MemberDTO memberDTO = MemberDTO.builder()
                    .memberId(username)
                    .name(oAuth2Response.getName()).build();

            return new CustomOAuth2User(memberDTO);
        }

        existData = OAuth2Member.builder()
                .name(oAuth2Response.getName())
                .email(oAuth2Response.getEmail()).build();

        oAuth2MemberMapper.updateOAuth2Member(existData);

        MemberDTO memberDTO = MemberDTO.builder()
                .memberId(existData.getMemberId())
                .name(oAuth2Response.getName()).build();

        return new CustomOAuth2User(memberDTO);
    }
}