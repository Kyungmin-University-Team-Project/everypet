package com.everypet.member.domain;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class Member {
    private String member_id;
    private String member_pwd;
    private String member_name;
}
