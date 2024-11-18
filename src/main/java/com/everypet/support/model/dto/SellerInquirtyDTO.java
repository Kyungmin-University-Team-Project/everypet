package com.everypet.support.model.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class SellerInquirtyDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InsertSellerInquiry {

        @ApiModelProperty(example = "uuid", notes = "상품의 아이디")
        private String productId; // 상품 아이디

        @ApiModelProperty(example = "제목을 입력해주세요", notes = "문의 제목")
        private String title; // 제목

        @ApiModelProperty(example = "내용을 입력해주세요", notes = "문의 내용")
        private String content; // 내용

        @Schema(hidden = true)
        private String memberId; // 회원 아이디

        @Schema(hidden = true)
        private String status; // 상태

        @Schema(hidden = true)
        private String regDate; // 등록일

        @Schema(hidden = true)
        private String answerDate; // 답변일

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateSellerInquiry {

        @ApiModelProperty(example = "제목을 입력해주세요", notes = "문의 제목")
        private String title; // 제목

        @ApiModelProperty(example = "내용을 입력해주세요", notes = "문의 내용")
        private String content; // 내용

    }

}
