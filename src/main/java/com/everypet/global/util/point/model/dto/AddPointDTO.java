package com.everypet.global.util.point.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddPointDTO {

    @ApiModelProperty(example = "user", notes = "회원 아이디")
    private String memberId;

    @ApiModelProperty(example = "100", notes = "포인트")
    private int point;

}
