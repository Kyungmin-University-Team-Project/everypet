package com.everypet.util.jwt.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {

    private Long id;

    private String memberId;

    private String refreshToken;

    private String expirationDate;
}
