package com.everypet.member.model.dto.member;

import com.everypet.global.util.mail.model.dto.VerificationDTO;
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

    @ApiModelProperty(example="또시", notes = "비밀번호 찾기 답변")
    private String answer;

    private VerificationDTO verification;

}