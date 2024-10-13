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
public class FindIdDTO {

    @ApiModelProperty(example = "이용구", notes = "이름")
    private String name;

    @ApiModelProperty(example = "abc@naver.com", notes = "이메일")
    private String email;

}
