package com.everypet.mail.model.dto;


import com.everypet.mail.model.constant.Purpose;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerificationDTO {

    @ApiModelProperty(example = "1234", notes = "인증코드")
    private String code;

    @ApiModelProperty(example = "SIGNUP", notes = "이메일 목적", allowableValues = "SIGNUP, PASSWORD_CHANGE, PASSWORD_FIND, DELETE_ACCOUNT")
    private Purpose purpose;

}