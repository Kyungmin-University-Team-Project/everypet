package com.everypet.keyword.controller;

import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.keyword.model.dto.KeywordRankDTO.TopKeywordRank;
import com.everypet.keyword.service.KeywordRankService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api("랭크 Api")
@RestController
@RequiredArgsConstructor
@RequestMapping("/keyword-rank")
public class KeywordRankController {

    private final KeywordRankService keywordRankService;

    // 실시간 검색어 순위
    @ApiOperation(value = "실시간 검색어 순위", notes = "실시간 검색어 순위와 변동 상태")
    @PostMapping("/real-time-rank")
    public ResponseEntity<TopKeywordRank> realTimeKeyword() {
        return ResponseEntityUtil.response(keywordRankService.findAllTopKeywordRank(), HttpStatus.OK);
    }

}
