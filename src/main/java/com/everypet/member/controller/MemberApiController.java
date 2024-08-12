package com.everypet.member.controller;

import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.global.util.mail.model.dto.VerificationDTO;
import com.everypet.global.util.mail.service.EmailService;
import com.everypet.member.model.dto.MemberInfoDTO;
import com.everypet.member.model.dto.PasswordChageDTO;
import com.everypet.member.model.dto.SignupDTO;
import com.everypet.member.model.vo.Member;
import com.everypet.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@Api(tags = "회원 Api")
@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;
    private final EmailService emailService;

    @ApiOperation(value = "회원 가입", notes = "새로운 회원을 등록합니다.")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignupDTO member, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return ResponseEntityUtil.response("회원 가입 실패", HttpStatus.BAD_REQUEST);
        }

        if (!validateEmailCode(member.getVerification())) {
            return ResponseEntityUtil.response("인증코드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        memberService.register(member);
        return ResponseEntityUtil.response("회원 가입 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "비밀번호 변경", notes = "회원의 비밀번호를 변경합니다.")
    @PostMapping("/member/password/change")
    public ResponseEntity<String> changePassword(@ApiIgnore @AuthenticationPrincipal Member member,  @Valid @RequestBody PasswordChageDTO passwordChage) {

        if(!validateEmailCode(passwordChage.getVerification())) {
            return ResponseEntityUtil.response("인증코드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        memberService.changePassword(member, passwordChage);

        return ResponseEntityUtil.response("비밀번호 변경 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "회원 정보 조회", notes = "회원의 정보를 조회합니다.")
    @PostMapping("/member/info")
    public ResponseEntity<MemberInfoDTO> getMemberInfo(@ApiIgnore @AuthenticationPrincipal Member member) {
        MemberInfoDTO memberInfo = memberService.getMemberInfoByMemberId(member.getMemberId());
        memberInfo.setAuthorities((List<GrantedAuthority>) member.getAuthorities());
        return ResponseEntityUtil.response(memberInfo, HttpStatus.OK);
    }

    @ApiModelProperty(value = "관리자 페이지", notes = "관리자 페이지입니다.")
    @GetMapping("/admin")
    public ResponseEntity<String> admin() {
        return ResponseEntityUtil.response("ok", HttpStatus.OK);
    }

    @ApiModelProperty(value = "사용자 페이지", notes = "사용자 페이지입니다.")
    @GetMapping("/user")
    public ResponseEntity<String> user() {
        return ResponseEntityUtil.response("ok", HttpStatus.OK);
    }

    private boolean validateEmailCode(VerificationDTO verification) {
        return emailService.verifyCode(verification);
    }

}