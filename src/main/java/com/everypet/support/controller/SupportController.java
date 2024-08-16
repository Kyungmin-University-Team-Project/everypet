package com.everypet.support.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "고객센터 Api")
@RequestMapping("/support")
@RestController
@RequiredArgsConstructor
public class SupportController {

    // 1대1 실시간 대화, FAQ, 공지사항, 문의하기, 고객센터 판매자 문의

    // 판매자 문의 리스트
    @ApiOperation(value = "판매자 문의 리스트", notes = "판매자 문의 리스트를 조회합니다.")
    @GetMapping("/seller/inquiry")
    public void sellerInquiry() {

    }

}
