package com.everypet.global.util.point.model.dao;

import com.everypet.global.util.point.model.vo.Point;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PointMapper {
    List<Point> findPointByMemberId(String memberId);
    boolean addMemberPoints(Point entity);
    boolean addPointHistory(Point entity);
}
