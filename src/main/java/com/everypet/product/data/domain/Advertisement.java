package com.everypet.product.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Advertisement {

    private String advertisementId; // 광고 아이디
    private String memberId; // 회원 아이디
    private LocalDate advertisementStartDate; // 광고 시작 날짜
    private LocalDate advertisementEndDate; // 광고 종료 날짜
    private char advertisementStatusYn; // 광고 상태 여부
    private int advertisementSequence; // 광고 순서

}
