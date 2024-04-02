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
    @ApiModelProperty(example = "user")
    private String memberId;
    @ApiModelProperty(example = "123")
    private String memberPwd;
    @ApiModelProperty(example = "이용호")
    private String name;
    @ApiModelProperty(example = "ROLE_USER")
    private String role;
}
