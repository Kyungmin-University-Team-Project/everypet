package com.everypet.point.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Point {

    private int pointId;

    private String memberId;

    private String pointType;

    private int pointAmount;

    private String pointDescription;

    private Date createPointDate;

}
