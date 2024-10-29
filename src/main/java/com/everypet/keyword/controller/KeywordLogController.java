
package com.everypet.keyword.controller;

import com.everypet.keyword.model.vo.KeywordLog;
import com.everypet.keyword.service.KeywordLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "키워드 로그 Api")
@RestController
@RequiredArgsConstructor
@RequestMapping("/keyword-log")
public class KeywordLogController {

    private final KeywordLogService keywordLogService;

    @ApiOperation(value = "전체 키워드 로그 출력", notes = "전체 키워드 로그를 출력합니다.")
    @PostMapping("/find-all")
    public ResponseEntity<List<KeywordLog>> findAllKeywordLog() {
        return ResponseEntity.ok(keywordLogService.findAllKeywordLog());
    }

}
