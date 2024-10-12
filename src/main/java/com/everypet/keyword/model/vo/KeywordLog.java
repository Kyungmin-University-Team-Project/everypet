package com.everypet.keyword.model.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class KeywordLog {
    @ApiModelProperty(value = "검색어 로그 아이디", example = "1")
    private int keywordLogId; // 검색어 로그 아이디
    @ApiModelProperty(value = "검색어", example = "강아지")
    private String keyword; // 검색어
    @ApiModelProperty(value = "회원 아이디 (없을 경우 anonymous) ", example = "user")
    private String memberId; // 회원 아이디
    @ApiModelProperty(value = "검색 시간", example = "2021-08-01T00:00:00")
    private LocalDateTime searchDate; // 검색 시간
}
