package com.everypet.global.util.point.service.impl;

import com.everypet.global.util.point.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {

    @Override
    public void accumulateReferralPoints(String memberId, int point) {

    }
}
