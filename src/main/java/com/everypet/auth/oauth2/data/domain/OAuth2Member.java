package com.everypet.auth.oauth2.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OAuth2Member {

    private String memberId;

    private String name;

    private String email;

}
