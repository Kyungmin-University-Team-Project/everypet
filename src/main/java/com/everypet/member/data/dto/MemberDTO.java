package com.everypet.member.data.dto;

import com.everypet.member.data.domain.Member;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    @ApiModelProperty(example = "user", notes = "회원 아이디")
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Size(min = 3, max = 50, message = "아이디는 3자 이상, 50자 이하로 입력해주세요.")
    private String memberId;

    @ApiModelProperty(example = "!Abcdefg123", notes = "회원 비밀번호")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 50, message = "비밀번호는 8자 이상, 50자 이하로 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.")
    private String memberPwd;

    @ApiModelProperty(example = "이용호", notes = "회원 이름")
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    @Size(min = 2, max = 20, message = "이름은 2자 이상, 20자 이하로 입력해주세요.")
    private String name;

    @ApiModelProperty(example = "abc@naver.com", notes = "회원 이메일")
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    @ApiModelProperty(example = "010-1234-5678", notes = "회원 전화번호")
    @NotBlank(message = "전화번호는 필수 입력 값입니다.")
    private String phone;

    @ApiModelProperty(example = "N", notes = "마케팅 동의 여부")
    private char agreeMarketingYn;

    public Member toEntity() {
        return Member.builder()
                .memberId(memberId)
                .memberPwd(memberPwd)
                .name(name)
                .email(email)
                .phone(phone)
                .agreeMarketingYn(agreeMarketingYn)
                .build();
    }

}
