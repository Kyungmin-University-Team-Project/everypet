package com.everypet.keyword.scheduler;

import com.everypet.keyword.model.dto.KeywordRankDTO;
import com.everypet.keyword.service.KeywordRankService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class KeywordScheduler {

    private static final Logger log = LogManager.getLogger(KeywordScheduler.class);

    private final RedisTemplate<String, String> redisTemplate;

    private final KeywordRankService keywordRankService;

    /**
     * 10분마다 랭크 기록을 업데이트 혹은 랭크기록이 없으면 새로 저장합니다.
     * Redis에 저장된 랭크 기록을 가져와서 랭크 기록으로 저장합니다.
     */
    @Scheduled(cron = "0 */10 * * * *", zone = "Asia/Seoul")
    public void updateKeywordRank() {

        // "search:*" 패턴에 해당하는 모든 키를 가져와서 검색 기록으로 저장 (scan 사용) - 대용량 데이터 처리 할떄 권장
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(
                new ScanOptions.ScanOptionsBuilder().match("search:*").build()
        );

        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            String keyword = redisTemplate.opsForValue().get(key);

            KeywordRankDTO keywordRankDTO = keywordRankService.findKeywordRank(keyword);
            if (keywordRankDTO != null) {
                keywordRankService.updateTotalScore(keywordRankDTO);
            } else {
                keywordRankService.saveKeywordRank(keyword);
            }
        }

        keywordRankService.updateRanking();

        // "search:*" 패턴에 해당하는 모든 키 삭제
        Set<String> keys = redisTemplate.keys("search:*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }

    }

    /**
     * 1시간마다 Redis에 저장된 랭크 기록을 삭제합니다.
     * 1시간마다 검색 점수가 0인 랭크 기록을 삭제합니다. (사용자가 잘못 입력 했을 경우를 대비하여)
     * 1시간마다 검색 점수를 초기화합니다.
     */
    @Scheduled(cron = "0 0 * * * *", zone = "Asia/Seoul")  // 한국시간 매 1시간마다 실행
    public void resetOneHourScore() {
        keywordRankService.deleteRankWithZeroScore();
        keywordRankService.resetOneHourScore();
    }

    /**
     * 매일 0시마다 랭크 기록을 초기화합니다.
     */
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")  // 한국시간 매일 0시마다 실행
    public void resetDailyScore() {
        keywordRankService.resetDailyScore();
    }

    /**
     * 매주 월요일 0시마다 랭크 기록을 초기화합니다.
     */
    @Scheduled(cron = "0 0 0 * * MON", zone = "Asia/Seoul")  // 한국시간 매주 월요일 0시마다 실행
    public void resetWeeklyScore() {
        keywordRankService.resetWeeklyScore();
    }

}