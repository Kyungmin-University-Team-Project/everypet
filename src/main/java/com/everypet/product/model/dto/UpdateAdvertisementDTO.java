package com.everypet.product.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAdvertisementDTO {

    @NotBlank
    @ApiModelProperty(example = "uuid", notes = "광고의 아이디")
    private String advertisementId; // 광고 아이디

    @NotBlank
    @ApiModelProperty(example = "user", notes = "회원의 아이디")
    private String memberId; // 회원 아이디

    @NotBlank
    @ApiModelProperty(example = "uuid", notes = "상품의 아이디")
    private String productId; // 상품 아이디

    @NotBlank
    @ApiModelProperty(example = "이미지 파일", notes = "광고 이미지")
    private MultipartFile advertisementImage; // 광고 이미지

    @NotBlank
    @ApiModelProperty(example = "2024-05-01", notes = "광고 노출 시작 시간")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate advertisementStartDate; // 광고 시작 날짜

    @NotBlank
    @ApiModelProperty(example = "2024-06-01", notes = "광고 노출 끝 시간")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate advertisementEndDate; // 광고 종료 날짜

    @NotBlank
    @ApiModelProperty(example = "Y", notes = "광고 노출 여부")
    private char advertisementStatusYn; // 광고 상태 여부

    @NotBlank
    @ApiModelProperty(example = "1", notes = "광고의 순서")
    private int advertisementSequence; // 광고 순서
}
