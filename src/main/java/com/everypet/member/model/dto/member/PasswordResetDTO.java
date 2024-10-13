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
public class PasswordResetDTO {

    @ApiModelProperty(example = "memberId", notes = "회원 아이디")
    private String memberId;

    @ApiModelProperty(example="이메일", notes = "회원 이메일")
    private String email;

}
