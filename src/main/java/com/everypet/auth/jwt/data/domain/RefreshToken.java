package com.everypet.auth.jwt.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "refresh_token")
public class RefreshToken {

    private Long id;

    @Id
    private String memberId;

    @Indexed
    private String refreshToken;

    @TimeToLive
    private String expirationDate;

}
