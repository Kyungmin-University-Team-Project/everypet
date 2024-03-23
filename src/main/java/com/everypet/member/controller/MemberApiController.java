package com.everypet.member.controller;

import com.everypet.member.data.dto.MemberDTO;
import com.everypet.member.service.serviceInterface.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberApiController {

    private final MemberService memberService;

    public MemberApiController(MemberService memberService) {
        this.memberService = memberService;
    }
    @PostMapping("/signup")
    public String signUp(MemberDTO member) {
        System.out.println(member.getMemberId());
        memberService.register(member);
        return "ok";
    }
    @GetMapping("/admin")
    public String admin() {
        return "yongho";
    }
}
