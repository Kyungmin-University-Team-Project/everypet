package com.everypet.point.controller;

import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.point.model.vo.Point;
import com.everypet.point.service.PointService;
import com.everypet.member.model.vo.Member;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RequestMapping("/point")
@Api(tags = "포인트 Api")
@RestController
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;

    @ApiOperation(value = "포인트 리스트 조회", notes = "포인트 정보를 조회합니다.")
    @GetMapping("/list")
    public ResponseEntity<List<Point>> getPointList(@ApiIgnore @AuthenticationPrincipal Member member) {
        return ResponseEntityUtil.response(pointService.getPointList(member), HttpStatus.OK);
    }

}