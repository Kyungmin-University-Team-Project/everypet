package com.everypet.member.model.dto.member;

import com.everypet.global.util.mail.model.dto.VerificationDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChageDTO {

    @ApiModelProperty(example = "!Abcdefg123", notes = "기존 비밀번호")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 50, message = "비밀번호는 8자 이상, 50자 이하로 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.")
    private String oldPassword;

    @ApiModelProperty(example = "!Abcdefg123", notes = "회원 비밀번호")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 50, message = "비밀번호는 8자 이상, 50자 이하로 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$", message = "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.")
    private String newPassword;

    private VerificationDTO verification;

}
