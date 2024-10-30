package com.everypet.support.model.vo;

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

    private final LocalDateTime inquiryDate; // 문의 날짜

    private final LocalDateTime inquiryUpdateDate; // 문의 수정 날짜

    private final LocalDateTime inquiryDeleteDate; // 문의 삭제 날짜

    private final String inquiryStatus; // 문의 상태

}
