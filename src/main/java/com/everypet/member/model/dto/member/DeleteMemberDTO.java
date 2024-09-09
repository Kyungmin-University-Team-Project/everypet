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
public class DeleteMemberDTO {

    @ApiModelProperty(value = "회원 비밀번호", example = "1234", notes = "삭제할 회원의 비밀번호를 입력해주세요.")
    private String password;

    private VerificationDTO verification;

}