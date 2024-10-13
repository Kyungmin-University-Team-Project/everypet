package com.everypet.member.model.dto.member;

import com.everypet.member.model.dto.address.SignupAddressDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDTO {

    @ApiModelProperty(example = "user", notes = "회원 아이디")
    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Size(min = 3, max = 50, message = "아이디는 3자 이상, 50자 이하로 입력해주세요.")
    private String memberId;

    @ApiModelProperty(example = "!Abcdefg123", notes = "회원 비밀번호")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 50, message = "비밀번호는 8자 이상, 50자 이하로 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.")
    private String memberPwd;

    @ApiModelProperty(example = "abc@naver.com", notes = "회원 이메일")
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    @ApiModelProperty(example = "이용호", notes = "회원 이름")
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    @Size(min = 2, max = 20, message = "이름은 2자 이상, 20자 이하로 입력해주세요.")
    private String name;

    @ApiModelProperty(example = "1990-01-01", notes = "회원 생년월일")
    @NotNull(message = "생년월일은 필수 입력 값입니다.")
    @Past(message = "생년월일은 현재 날짜보다 이전이어야 합니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;

    @ApiModelProperty(example = "010-1234-5678", notes = "회원 전화번호")
    @NotBlank(message = "전화번호는 필수 입력 값입니다.")
    private String phone;

    @ApiModelProperty(example = "yongho", notes = "추천인 아이디")
    private String referrer;

    @ApiModelProperty(example = "N", notes = "마케팅 동의 여부")
    private char agreeMarketingYn;

    private SignupAddressDTO address;

}