package com.everypet.support.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SellerInquiry {

    private Long sellerInquiryId; // 판매자 문의 ID

    private String productId; // 상품 ID

    private String memberId; // 회원 ID

    private SellerInquiryReply replyId; // 답변 ID

    private String inquiryTitle; // 문의 제목

    private String inquiryContents; // 문의 내용

    private String inquiryStatus; // 문의 상태

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime inquiryDate; // 문의 날짜

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime inquiryUpdateDate; // 문의 수정 날짜

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime inquiryDeleteDate; // 문의 삭제 날짜

}