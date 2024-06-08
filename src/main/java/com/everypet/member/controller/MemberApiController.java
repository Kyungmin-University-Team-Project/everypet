package com.everypet.member.controller;

import com.everypet.member.data.dto.SignupRequestDTO;
import com.everypet.member.data.vo.Address;
import com.everypet.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Api(tags = "회원 Api")
@RestController
@RequiredArgsConstructor
public class MemberApiController {

    //private static final Logger log = LoggerFactory.getLogger(MemberApiController.class);
    private final MemberService memberService;

    @ApiOperation(value = "회원 가입", notes = "새로운 회원을 등록합니다.")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignupRequestDTO member, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            //log.error("회원 가입 실패");
            return response(HttpStatus.BAD_REQUEST, "회원 가입 실패");
        }

        memberService.register(member);
        return response(HttpStatus.CREATED, "회원 가입 완료");
    }

    @ApiOperation(value = "주소 추가", notes = "회원의 주소를 추가합니다.")
    @PostMapping("/address/register")
    public ResponseEntity<String> addressRegister(@RequestBody Address address) {
        memberService.addressRegister(address);
        return response(HttpStatus.CREATED, "주소 추가 완료");
    }

    @ApiModelProperty(value = "관리자 페이지", notes = "관리자 페이지입니다.")
    @GetMapping("/admin")
    public ResponseEntity<String> admin() {
        return response(HttpStatus.OK, "ok");
    }

    @ApiModelProperty(value = "사용자 페이지", notes = "사용자 페이지입니다.")
    @GetMapping("/user")
    public ResponseEntity<String> user() {
        return response(HttpStatus.OK, "ok");
    }

    public ResponseEntity<String> response(HttpStatus httpStatus, String message) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(message);
    }
}