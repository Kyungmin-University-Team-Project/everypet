package com.everypet.global.util.mail.model.dto;

import com.everypet.global.util.mail.model.constant.Purpose;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailMessageDTO {

    @ApiModelProperty(example = "abc@naver.com", notes = "받는 사람 이메일")
    private String to;

    @ApiModelProperty(example = "SIGNUP", notes = "이메일 목적", allowableValues = "SIGNUP, PASSWORD_CHANGE, PASSWORD_FIND")
    private Purpose purpose;

}