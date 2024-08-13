package com.everypet.global.util.mail.controller;

import com.everypet.global.util.ResponseEntityUtil;
import com.everypet.global.util.mail.model.dto.EmailMessageDTO;
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
    })
    @PostMapping("/code")
    public ResponseEntity<String> sendMail(@RequestBody EmailMessageDTO emailMessageDTO) {

        emailService.sendCode(emailMessageDTO.getTo(), emailMessageDTO.getPurpose());

        return ResponseEntityUtil.response("이메일이 발송되었습니다.", HttpStatus.OK);
    }

}