package com.everypet.global.util.mail.controller;

import com.everypet.global.util.mail.data.dto.EmailMessageDTO;
import com.everypet.global.util.mail.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RequestMapping("/send-mail")
@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final StringRedisTemplate redisTemplate;

    // 임시 비밀번호 발급
    /*@PostMapping("/password")
    public ResponseEntity sendPasswordMail(@RequestBody EmailPostDto emailPostDto) {
        EmailMessageDTO emailMessage = EmailMessageDTO.builder()
                .to(emailPostDto.getEmail())
                .subject("[SAVIEW] 임시 비밀번호 발급")
                .build();

        emailService.sendMail(emailMessage, "password");

        return ResponseEntity.ok().build();
    }*/

    // 회원가입 이메일 인증
    @PostMapping("/email")
    public ResponseEntity sendJoinMail(@RequestBody String email) {
        String token = emailService.createToken();
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        valueOps.set(token, email, Duration.ofMinutes(5)); // 5분간 유효

        EmailMessageDTO emailMessage = EmailMessageDTO.builder()
                .to(email)
                .subject("[Pornhub] 이메일 인증을 위한 인증 코드 발송")
                .build();

        emailService.joinSendMail(emailMessage, token);

        return response(HttpStatus.OK, "이메일이 발송되었습니다.");
    }

    // 이메일 인증 처리
    @GetMapping("/verify")
    public ResponseEntity verifyEmail(@RequestParam String token) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
        String email = valueOps.get(token);

        if (email != null) {
            // 사용자 인증 로직 처리
            // email을 사용하여 사용자 정보 업데이트
            redisTemplate.delete(token);
            return response(HttpStatus.OK, "이메일 인증이 완료되었습니다.");
        } else {
            return response(HttpStatus.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }
    }

    public ResponseEntity<String> response(HttpStatus httpStatus, String result) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(result);
    }

}