package com.everypet.global.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RedisKeyUtils {

    private static RedisTemplate<String, String> redisTemplate;

    @Autowired
    public void setRedisTemplate(RedisTemplate<String, String> redisTemplate) {
        RedisKeyUtils.redisTemplate = redisTemplate; // static 변수에 주입
    }

    public static Set<String> scanRedisKeys(String pattern) {

        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(
                new ScanOptions.ScanOptionsBuilder().match(pattern).build()
        );

        Set<String> keys = new HashSet<>();
        while (cursor.hasNext()) {
            keys.add(new String(cursor.next()));
        }
        return keys;
    }

    public static void deleteRedisKeys(Set<String> keys) {
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}
