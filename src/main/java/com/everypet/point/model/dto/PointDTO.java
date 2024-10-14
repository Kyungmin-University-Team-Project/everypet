package com.everypet.point.model.dto;

import com.everypet.point.model.constant.PointType;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PointDTO {

    @JsonIgnore
    @ApiModelProperty(example = "user", notes = "회원 아이디", hidden = true)
    private String memberId;

    @JsonIgnore
    @ApiModelProperty(example = "500", notes = "적립 혹은 차감 포인트", hidden = true)
    private int pointAmount;

    @JsonIgnore
    @ApiModelProperty(example = "signup", notes = "포인트 타입", hidden = true)
    private PointType pointType;

    @JsonIgnore
    @ApiModelProperty(example = "회원가입", notes = "포인트 설명", hidden = true)
    private String pointDescription;

    public static PointDTO createPointDTO(String memberId, int pointAmount, PointType pointType, String pointDescription) {
        return PointDTO.builder()
                .memberId(memberId)
                .pointAmount(pointAmount)
                .pointType(pointType)
                .pointDescription(pointDescription)
                .build();
    }

}
