package com.everypet.point.service.impl;

import com.everypet.point.mapper.MsPointMapper;
import com.everypet.point.model.constant.PointType;
import com.everypet.point.model.dao.PointMapper;
import com.everypet.point.model.dto.PointDTO;
import com.everypet.point.model.vo.Point;
import com.everypet.point.service.PointService;
import com.everypet.member.exception.MemberIdNotFoundException;
import com.everypet.member.model.dao.MemberMapper;
import com.everypet.member.model.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {

    private final MemberMapper memberMapper;
    private final PointMapper pointMapper;

    @Value("${point.signup}")
    private int signupPoint;

    @Value("${point.referral}")
    private int referralPoint;

    @Override
    public List<Point> getPointList(Member memberId) {
        return pointMapper.findPointByMemberId(memberId.getMemberId());
    }

    @Override
    public void accumulateSignupPoints(Member member) {

        PointDTO dto = PointDTO.createPointDTO(member.getMemberId(), signupPoint, PointType.SIGN_UP, PointType.SIGN_UP.getDescription());

        addMemberPoints(dto);

        if(!pointMapper.addPointHistory(MsPointMapper.INSTANCE.toVo(dto))){
            throw new RuntimeException("해당 회원은 존재하지 않습니다.");
        }
    }

    @Override
    public void accumulateReferralPoints(Member member) {

        PointDTO dto = PointDTO.createPointDTO(member.getMemberId(), referralPoint, PointType.REFERRAL, PointType.REFERRAL.getDescription());

        if(memberMapper.existsByPhoneNumber(member.getPhone())){
            throw new RuntimeException("자기 자신은 추천인으로 등록할 수 없습니다.");
        }

        addMemberPoints(dto);

        if(!pointMapper.addPointHistory(MsPointMapper.INSTANCE.toVo(dto))) {
            throw new RuntimeException("포인트 적립에 실패하였습니다.");
        }
    }

    private void addMemberPoints(PointDTO dto) {
        if(!pointMapper.addMemberPoints(MsPointMapper.INSTANCE.toVo(dto))){
            throw new MemberIdNotFoundException(dto.getMemberId());
        }
    }
}