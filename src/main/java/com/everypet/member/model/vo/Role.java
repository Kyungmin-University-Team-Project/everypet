package com.everypet.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    private String memberId;
    private String authorities;

    public static Role of(String memberId, String authorities) {
        return Role.builder()
                .memberId(memberId)
                .authorities(authorities)
                .build();
    }
}