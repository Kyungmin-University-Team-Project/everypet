package com.everypet.member.data.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    @ApiModelProperty(example = "user", notes = "회원 아이디")
    private String memberId;

    @ApiModelProperty(example = "123", notes = "회원 비밀번호")
    private String memberPwd;

    @ApiModelProperty(example = "이용호", notes = "회원 이름")
    private String name;

    @ApiModelProperty(example = "abc@naver.com", notes = "회원 이메일")
    private String email;

    @ApiModelProperty(example = "010-1234-5678", notes = "회원 전화번호")
    private String phone;

    @ApiModelProperty(example = "N", notes = "마케팅 동의 여부")
    private char agreeMarketingYn;

}
