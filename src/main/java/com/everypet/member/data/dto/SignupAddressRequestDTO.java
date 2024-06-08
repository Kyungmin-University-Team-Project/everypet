package com.everypet.member.data.dto;

import com.everypet.member.data.vo.Address;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupAddressRequestDTO {

    @ApiModelProperty(example = "서울시 강남구 롯데캐슬 아파트", notes = "주소")
    @NotBlank(message = "주소는 필수 입력 값입니다.")
    private String address;

    @ApiModelProperty(example = "105-1505", notes = "상세 주소")
    @NotBlank(message = "상세 주소는 필수 입력 값입니다.")
    private String detailAddress;

    public Address toEntity(SignupRequestDTO member) {
        return Address.builder()
                .memberId(member.getMemberId())
                .address(address)
                .detailAddress(detailAddress)
                .receiver(member.getMemberId())
                .phone(member.getPhone())
                .request("문 앞")
                .defaultYn('Y')
                .build();
    }

}