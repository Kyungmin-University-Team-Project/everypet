package com.everypet.util.oauth2.service;

import com.everypet.member.data.dao.MemberMapper;
import com.everypet.member.data.dao.RoleMapper;
import com.everypet.member.data.domain.Member;
import com.everypet.member.data.domain.Role;
import com.everypet.member.data.dto.MemberDTO;
import com.everypet.util.oauth2.dto.CustomOAuth2User;
import com.everypet.util.oauth2.dto.GoogleResponse;
import com.everypet.util.oauth2.dto.NaverResponse;
import com.everypet.util.oauth2.dto.dtoInterface.OAuth2Response;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final MemberMapper memberMapper;
    private final RoleMapper roleMapper;

    public OAuth2UserService(MemberMapper memberMapper, RoleMapper roleMapper) {this.memberMapper = memberMapper;
        this.roleMapper = roleMapper;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {

        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else {
            return null;
        }

        //리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듬
        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();

        boolean isExist = memberMapper.existsByMemberId(username);

        //회원가입이 되어있지 않다면
        if(!isExist) {

            MemberDTO member = new MemberDTO();
            member.setMemberId(username);
            member.setName(oAuth2Response.getName());
            member.setMemberPwd("OAuth2");
            member.setRole("ROLE_USER");
            memberMapper.insertMember(member);
            roleMapper.insertRole(Role.builder()
                    .memberId(member.getMemberId())
                    .authorities("ROLE_USER")
                    .build());

            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setMemberId(username);
            memberDTO.setName(oAuth2Response.getName());
            memberDTO.setRole("ROLE_USER");

            return new CustomOAuth2User(memberDTO);

        } else {
            // 회원가입이 되어있다면
            Member member = memberMapper.selectMemberByMemberId(username).get();
            MemberDTO memberDTO = new MemberDTO();

            memberDTO.setMemberId(member.getMemberId());
            memberDTO.setName(oAuth2Response.getName());
            memberDTO.setRole(member.getAuthorities().toString());

            // 업데이트 쿼리 추가
            // !!!! 추가해 !!!!!
            System.out.println("업데이트 쿼리문 추가해");

            return new CustomOAuth2User(memberDTO);
        }
    }
}
