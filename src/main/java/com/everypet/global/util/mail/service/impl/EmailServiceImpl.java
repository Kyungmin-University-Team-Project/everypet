package com.everypet.global.util.mail.service.impl;

import com.everypet.global.util.mail.data.dto.EmailMessageDTO;
import com.everypet.global.util.mail.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;


    /** 회원가입 이메일 인증 메서드
     * @param email 이메일 정보
     * @param code 인증 코드
     */
    @Override
    public void sendCode(EmailMessageDTO email, int code) {
        
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(email.getSubject()); // 메일 제목

            String htmlContent = loadEmailTemplate(code);

            mimeMessageHelper.setText(htmlContent, true); // HTML 여부 설정
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // 인증번호 생성 메서드
    @Override
    public int createCode() {
        SecureRandom random = new SecureRandom();
        return random.nextInt(9000) + 1000;
    }

    private String loadEmailTemplate(int code) {
        try {
            ClassPathResource resource = new ClassPathResource("/static/verification-email.html");
            String template = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return String.format(template, code);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load email template", e);
        }
    }
}