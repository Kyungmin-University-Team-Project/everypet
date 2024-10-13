package com.everypet.review.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewHelpfulDTO {
    @NotBlank
    @ApiModelProperty(example = "reviewId", notes = "reviewId를 넣어주세요.")
    private Long reviewId;  // 리뷰 ID

    @NotBlank
    @ApiModelProperty(example = "Y", notes = "리뷰가 도움이 됐으면 Y, 안 됐으면 N.  Y 또는 N만 가능합니다.")
    @Pattern(
            regexp = "^(Y|N)$",
            message = "도움이 됐는지 여부는 'Y' 또는 'N'만 입력 가능합니다."
    )
    private String isHelpfulYn;  // 'Y' 또는 'N' (도움이 됐는지 여부)
}
