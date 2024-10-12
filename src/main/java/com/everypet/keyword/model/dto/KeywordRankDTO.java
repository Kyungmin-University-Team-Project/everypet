package com.everypet.keyword.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KeywordRankDTO {

    private String keyword; // 검색어
    private double totalScore; // 총 검색 점수
    private int ranking; // 순위
    private int previousRank; // 이전 순위
    private int rankingGap; // 순위 변동 값
    private double oneHourScore; // 1시간 검색 점수
    private double dailyScore; // 일일 검색 점수
    private double weeklyScore; // 주간 검색 점수
    private int totalCount; // 총 검색 횟수

    @Data
    @Builder
    public static class TopKeywordRank {

        @ApiModelProperty(value = "날짜", example = "2021-08-01T00:00:00")
        LocalDateTime date;

        List<TopKeywordRankDetail> topKeywordRankList;

        public static TopKeywordRank of(LocalDateTime date, List<TopKeywordRankDetail> topKeywordRankList) {
            return TopKeywordRank.builder()
                    .date(date)
                    .topKeywordRankList(topKeywordRankList)
                    .build();
        }
    }

    @Data
    @Builder
    public static class TopKeywordRankDetail {

        @ApiModelProperty(value = "검색어", example = "강아지")
        private String keyword; // 검색어

        @ApiModelProperty(value = "순위", example = "5")
        private int ranking; // 순위

        @ApiModelProperty(value = "이전 순위", example = "2")
        private int previousRank; // 이전 순위

        @ApiModelProperty(value = "순위 변동 값", example = "-3")
        private int rankingGap; // 순위 변동 값

    }
}