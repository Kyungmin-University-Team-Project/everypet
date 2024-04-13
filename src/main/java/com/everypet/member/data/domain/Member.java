package com.everypet.member.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member implements UserDetails {

    private String memberId;    // 회원 아이디

    private String memberPwd;   // 회원 비밀번호

    private String name;    // 회원 이름

    /*private String email;   // 회원 이메일

    private String phone;   // 회원 전화번호

    private Level level;    // 회원 등급

    private long point; // 회원 포인트

    private char agreeMarketingYn;  // 마케팅 동의 여부

    private char accIsLocked;   // 계정 잠김 여부*/

    private List<GrantedAuthority> authorities;

    public void setAuthorities(List<String> authList) {

        List<GrantedAuthority> authorities = new ArrayList<>();

        for (String s : authList) {
            authorities.add(new SimpleGrantedAuthority(s));
        }

        this.authorities = authorities;
    }

    @Override
    // 권한
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return memberId;
    }

    @Override
    public String getPassword() {
        return memberPwd;
    }

    @Override
    // 계정이 만료 되지 않았는가?
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    // 계정이 잠기지 않았는가?
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    // 패스워드가 만료되지 않았는가?
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    // 계정이 활성화 되었는가?
    public boolean isEnabled() {
        return true;
    }

    // 아이디 중복 체크
    /*public void validateDuplicateMemberID(String id) {
        if (id.equals(this.getMemberId())) {
            throw new DuplicateMemberIDException(id);
        }
    }*/
}