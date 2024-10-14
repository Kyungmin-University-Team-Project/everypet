package com.everypet.keyword.service.impl;

import com.everypet.keyword.mapper.MsKeywordRankMapper;
import com.everypet.keyword.model.dao.KeywordRankMapper;
import com.everypet.keyword.model.dto.KeywordRankDTO;
import com.everypet.keyword.model.dto.KeywordRankDTO.TopKeywordRank;
import com.everypet.keyword.service.KeywordRankService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

@Service
@RequiredArgsConstructor
public class KeywordRankServiceImpl implements KeywordRankService {

    private static final Logger log = LogManager.getLogger(KeywordRankServiceImpl.class);
    private final RedisTemplate<String, String> redisTemplate;

    private final KeywordRankMapper keywordRankMapper;

    @Override
    public void updateRanking() {
        List<KeywordRankDTO> keywordList = keywordRankMapper.findAllKeywordRank();

        // 우선순위 큐를 사용해서 점수 기준으로 정렬
        Queue<KeywordRankDTO> rankingQueue = new PriorityQueue<>(
                Comparator.comparingDouble(KeywordRankDTO::getTotalScore).reversed()
        );

        rankingQueue.addAll(keywordList);

        for(int i = 1; !rankingQueue.isEmpty(); i++) {
            KeywordRankDTO keywordRankDTO = rankingQueue.poll();

            keywordRankDTO.setRanking(i);

            if (keywordRankDTO.getPreviousRank() == 0) {
                keywordRankDTO.setPreviousRank(i);
            }

            // 이전 순위와 현재 순위의 차이를 계산
            keywordRankDTO.setRankingGap(keywordRankDTO.getPreviousRank() - keywordRankDTO.getRanking());

            keywordRankMapper.updateTotalScore(keywordRankDTO);

            keywordRankDTO.setPreviousRank(i);
        }
    }

    @Override
    public void keywordRedisSave(String ip, String keyword) {
        String key = "search:" + ip + ":" + keyword;
        // 동시성 문제를 해결하기 위해 setIfAbsent 메서드 사용
        redisTemplate.opsForValue().setIfAbsent(key, keyword);
    }

    @Override
    public List<TopKeywordRank> findAllTopKeywordRank() {
        return keywordRankMapper.findTopKeywordRank();
    }

    @Override
    public KeywordRankDTO findKeywordRank(String keyword) {
        return keywordRankMapper.findKeywordRank(keyword);
    }

    @Override
    public void saveKeywordRank(String keyword) {
        KeywordRankDTO keywordRankDTO = MsKeywordRankMapper.INSTANCE.toSearchRecord(keyword);
        keywordRankMapper.saveKeywordRank(keywordRankDTO);
    }

    @Override
    public void updateTotalScore(KeywordRankDTO keywordRankDTO) {
        updateExistingSearchRecord(keywordRankDTO);
        keywordRankMapper.updateTotalScore(keywordRankDTO);
    }

    @Override
    public void deleteRankWithZeroScore() {
        keywordRankMapper.deleteRecordsWithZeroScore();
    }

    @Override
    public void resetOneHourScore() {
        keywordRankMapper.resetOneHourScore();
    }

    @Override
    public void resetDailyScore() {
        keywordRankMapper.resetDailyScore();
    }

    @Override
    public void resetWeeklyScore() {
        keywordRankMapper.resetWeeklyScore();
    }

    private void updateExistingSearchRecord(KeywordRankDTO keywordRankDTO) {
        keywordRankDTO.setTotalCount(keywordRankDTO.getTotalCount() + 1);
        keywordRankDTO.setOneHourScore(keywordRankDTO.getOneHourScore() + 1);
        keywordRankDTO.setDailyScore(keywordRankDTO.getDailyScore() + 1);
        keywordRankDTO.setWeeklyScore(keywordRankDTO.getWeeklyScore() + 1);
        keywordRankDTO.setTotalScore(calculateScore(keywordRankDTO));
    }

    // 최근 1시간, 하루, 일주일간의 검색량을 반영하여 검색어의 점수를 계산
    // 1시간, 하루 시간이 지나면 스케줄링이 0으로 초기화되기 때문에 검색량이 반영되지 않음
    private double calculateScore(KeywordRankDTO keywordRankDTO) {
        double recentlyScore = keywordRankDTO.getOneHourScore() * 0.15 + keywordRankDTO.getTotalCount() * 0.05;
        double dayScore = keywordRankDTO.getDailyScore() * 0.12 + keywordRankDTO.getTotalCount() * 0.04;
        double weekScore = keywordRankDTO.getWeeklyScore() * 0.04 + keywordRankDTO.getTotalCount() * 0.03;

        return recentlyScore + dayScore + weekScore;
    }
}