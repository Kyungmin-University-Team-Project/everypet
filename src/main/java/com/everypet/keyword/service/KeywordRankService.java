package com.everypet.keyword.service;

import com.everypet.keyword.model.dto.KeywordRankDTO;
import com.everypet.keyword.model.dto.KeywordRankDTO.TopKeywordRank;

public interface KeywordRankService {

    /**
     * 사용자의 검색 기록을 Redis에 저장합니다.
     *
     * @param ip 사용자의 IP 주소.
     *           악성 사용자가 중복 검색하여 랭킹 조작을 방지하기 위함입니다.
     * @param keyword 사용자가 검색한 키워드입니다.
     */
    void keywordRedisSave(String ip, String keyword);

    TopKeywordRank findAllTopKeywordRank();

    KeywordRankDTO findKeywordRank(String keyword);

    void updateRanking();

    void saveKeywordRank(String keyword);

    void updateTotalScore(KeywordRankDTO keyword);

    // 한번 입력하고 더이상 입력하지 않은 점수는 키워드 삭제
    void deleteRankWithZeroScore();

    void resetOneHourScore();

    void resetDailyScore();

    void resetWeeklyScore();

}