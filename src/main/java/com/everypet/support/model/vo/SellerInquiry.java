package com.everypet.support.model.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class SellerInquiry {

    private final Long sellerInquiryId; // 판매자 문의 ID

    private final String productId; // 상품 ID

    private final String memberId; // 회원 ID

    private final String inquiryTitle; // 문의 제목

    private final String inquiryContents; // 문의 내용

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime inquiryDate; // 문의 날짜

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime inquiryUpdateDate; // 문의 수정 날짜

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime inquiryDeleteDate; // 문의 삭제 날짜

    private final String inquiryStatus; // 문의 상태

}
