package com.everypet.global.util.mail.controller;

import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.global.util.mail.model.dto.EmailMessageDTO;
import com.everypet.global.util.mail.model.dto.VerificationDTO;
import com.everypet.global.util.mail.service.EmailService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/send-mail")
@Api(tags = "이메일 Api")
@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @ApiOperation(value = "코드 발송", notes = "코드를 발송합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "이메일이 발송되었습니다."),
    })sa
    @PostMapping("/code")
    public ResponseEntity<String> sendMail(@RequestBody EmailMessageDTO emailMessageDTO) {

        emailService.sendCode(emailMessageDTO.getTo(), emailMessageDTO.getPurpose());

        return ResponseEntityUtil.response("이메일이 발송되었습니다.", HttpStatus.OK);
    }
    
    @ApiOperation(value = "코드 인증", notes = "코드를 인증합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "코드가 일치합니다."),
            @ApiResponse(code = 400, message = "코드가 일치하지 않습니다.")
    })
    @PostMapping("/code/verify")
    public ResponseEntity<Boolean> verifyCode(@RequestBody VerificationDTO verificationDTO) {

        if(emailService.verifyCode(verificationDTO)) {
            return ResponseEntityUtil.response(true, HttpStatus.OK);
        }

        return ResponseEntityUtil.response(false, HttpStatus.BAD_REQUEST);
    }

}