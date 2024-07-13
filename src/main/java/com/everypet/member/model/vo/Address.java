package com.everypet.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

   private String memberId;    // 회원 아이디

    private String address;     // 주소

    private String detailAddress;    // 상세 주소

    private String receiver;    // 수령인

    private String phone;       // 수령인 전화번호

    private String request;     // 요청사항

    private char defaultYn;     // 기본 배송지 여부

}