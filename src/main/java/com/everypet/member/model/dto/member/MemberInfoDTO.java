package com.everypet.member.model.dto.member;

import com.everypet.member.model.constant.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoDTO {

    private String memberId;    // 회원 아이디

    private String name;    // 회원 이름

    private String email;   // 회원 이메일

    private String phone;   // 회원 전화번호

    private Level level;    // 회원 등급

    private long point; // 회원 포인트

    private char agreeMarketingYn;  // 마케팅 동의 여부

    private char accInactiveYn;    // 계정 비활성화 여부

    private char tempPwdYn; // 임시 비밀번호 여부

    private long accLoginCount; // 누적 로그인 횟수

    private long loginFailCount;  // 로그인 실패 횟수

    private Date lastLoginDate;   // 최근 로그인 일시

    private Date accRegisterDate;    // 계정 등록 일시

    private Date accUpdateDate;   // 계정 수정 일시

    private Date accDeleteDate;   // 계정 삭제 일시

    private List<GrantedAuthority> authorities;  // 권한 리스트
    
}