package com.everypet.member.model.dto.member;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindPasswordDTO {

    @ApiModelProperty(example = "abc@naver.com", notes = "회원 이메일")
    private String email;

    @ApiModelProperty(example = "이용호", notes = "회원 이름")
    private String name;

    @ApiModelProperty(example = "1234", notes = "인증 코드")
    private String code;

}
