package com.everypet.point.service;

import com.everypet.point.model.vo.Point;
import com.everypet.member.model.vo.Member;

import java.util.List;

public interface PointService {
    List<Point> getPointList(Member memberId);
    void accumulateSignupPoints(Member member);
    void accumulateReferralPoints(Member member);
}