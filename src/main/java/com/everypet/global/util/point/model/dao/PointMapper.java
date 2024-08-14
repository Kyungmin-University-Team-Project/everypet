package com.everypet.global.util.point.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointMapper {
    void addPoints(String memberId, int point);
}
