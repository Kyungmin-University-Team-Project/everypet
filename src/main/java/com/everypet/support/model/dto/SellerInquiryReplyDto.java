package com.everypet.support.model.dto;

import com.everypet.support.model.entity.SellerInquiryReply;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

public class SellerInquiryReplyDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateSellerInquiryReply {

        @ApiModelProperty(example = "1", notes = "질문자 문의 아이디")
        private Long sellerInquiryId;

        @ApiModelProperty(example = "답변 내용을 입력해주세요", notes = "답변 내용")
        private String replyContents;

        @ApiModelProperty(example = "uuid", notes = "상품 아이디")
        private String productId;

        @JsonIgnore
        @Schema(hidden = true)
        private Long sellerInquiryReplyId;

        @JsonIgnore
        @Schema(hidden = true)
        private String memberId;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateSellerInquiryReply {

        @ApiModelProperty(example = "답변 내용을 입력해주세요", notes = "답변 내용")
        private String replyContents;

        public static SellerInquiryReply toEntity(Long sellerInquiryReplyId, String replyContents, String memberId) {
            return SellerInquiryReply.builder()
                    .sellerInquiryReplyId(sellerInquiryReplyId)
                    .replyContents(replyContents)
                    .memberId(memberId)
                    .build();
        }

    }

}
