package com.everypet.global.util.mail.controller;

import com.everypet.global.util.mail.data.dto.EmailMessageDTO;
import com.everypet.global.util.mail.service.EmailService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@Api(tags = "이메일 Api", description = "회원가입 및 인증 관련 이메일 API")
@RequestMapping("/send-mail")
@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final StringRedisTemplate redisTemplate;

    // 회원가입 코드 발송
    @ApiOperation(value = "회원가입 코드 발송", notes = "회원가입을 위한 코드를 발송합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "이메일이 발송되었습니다."),
    })
    @PostMapping("/code")
    public ResponseEntity<String> sendJoinMail(@RequestBody @ApiParam(value = "수신자 이메일", required = true) String email) {
        int code = emailService.createCode();
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        valueOps.set(String.valueOf(code), email, Duration.ofMinutes(5)); // 5분간 유효

        EmailMessageDTO emailMessage = EmailMessageDTO.builder()
                .to(email)
                .subject("[Pornhub] 이메일 인증을 위한 인증 코드 발송")
                .build();

        emailService.sendCode(emailMessage, code);

       return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8").body("이메일이 발송되었습니다.");
    }

    // 이메일 인증 처리
    @ApiOperation(value = "이메일 인증", notes = "이메일 인증을 처리합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "true"),
            @ApiResponse(code = 400, message = "false")
    })
    @PostMapping("/verify/code")
    public ResponseEntity<Boolean> verifyEmail(@RequestBody @ApiParam(value = "인증코드", required = true) String code) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
        String email = valueOps.get(code);

        if (email != null) {
            // 사용자 인증 로직 처리
            // email을 사용하여 사용자 정보 업데이트
            redisTemplate.delete(code);
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
    }

}