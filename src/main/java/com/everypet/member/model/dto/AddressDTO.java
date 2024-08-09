package com.everypet.member.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {

    @ApiModelProperty(example = "서울시 강남구 롯데캐슬 아파트", notes = "주소")
    private String address; // 주소

    @ApiModelProperty(example = "105-1505", notes = "상세 주소")
    private String detailAddress;   // 상세 주소

    @ApiModelProperty(example = "이용호", notes = "수령인")
    private String receiver;    // 수령인

    @ApiModelProperty(example = "010-1234-5678", notes = "수령인 전화번호")
    private String phone;   // 수령인 전화번호

    @ApiModelProperty(example = "문앞", notes = "요청사항")
    private String request; // 요청사항

    @ApiModelProperty(example = "N", notes = "기본 배송지 여부")
    private char defaultYn; // 기본 배송지 여부

}
