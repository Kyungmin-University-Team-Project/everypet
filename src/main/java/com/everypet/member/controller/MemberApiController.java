package com.everypet.member.controller;

import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.member.model.dto.member.*;
import com.everypet.member.model.vo.Member;
import com.everypet.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "회원 Api")
@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    @ApiOperation(value = "회원 가입", notes = "새로운 회원을 등록합니다.")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignupDTO member, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return ResponseEntityUtil.response("회원 가입 실패", HttpStatus.BAD_REQUEST);
        }

        memberService.register(member);
        return ResponseEntityUtil.response("회원 가입 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "비밀번호 변경", notes = "회원의 비밀번호를 변경합니다.")
    @PostMapping("/password/change")
    public ResponseEntity<String> changePassword(@ApiIgnore @AuthenticationPrincipal Member member, @Valid @RequestBody PasswordChageDTO passwordChage, @ApiIgnore HttpServletRequest request) {

        memberService.changePassword(member, passwordChage, request);

        return ResponseEntityUtil.response("비밀번호 변경 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "회원 정보 조회", notes = "회원의 정보를 조회합니다.")
    @GetMapping("/info")
    public ResponseEntity<MemberInfoDTO> getMemberInfo(@ApiIgnore @AuthenticationPrincipal Member member) {
        MemberInfoDTO memberInfo = memberService.getMemberInfoByMemberId(member.getMemberId());
        memberInfo.setAuthorities((List<GrantedAuthority>) member.getAuthorities());
        return ResponseEntityUtil.response(memberInfo, HttpStatus.OK);
    }
    
    @ApiOperation(value = "아이디 찾기", notes = "아이디를 찾습니다.")
    @PostMapping("/id/find")
    public ResponseEntity<String> findId(@RequestBody FindIdDTO findIdDTO, @ApiIgnore HttpServletRequest request) {
        List<String> members = memberService.findMemberId(findIdDTO, request);
        return ResponseEntityUtil.response(members.toString(), HttpStatus.OK);
    }
    
    @ApiOperation(value = "비밀번호 찾기", notes = "이메일 인증을 통해 임시 비밀번호를 발급합니다.")
    @PostMapping("/password/reset")
    public ResponseEntity<String> passwordReset(@RequestBody PasswordResetDTO passwordResetDTO, @ApiIgnore HttpServletRequest request) {
        memberService.passwordReset(passwordResetDTO, request);
        return ResponseEntityUtil.response("임시 비밀번호 발급 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "회원탈퇴", notes = "회원을 탈퇴합니다.")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMember(@ApiIgnore @AuthenticationPrincipal Member member, @RequestBody DeleteMemberDTO deleteMemberDTO, @ApiIgnore HttpServletRequest request) {
        memberService.deleteMember(member, deleteMemberDTO, request);
        return ResponseEntityUtil.response("회원 탈퇴 성공", HttpStatus.OK);
    }

}