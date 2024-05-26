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
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;


    /** 회원가입 이메일 인증 메서드
     * @param email 이메일 정보
     * @param token 인증 토큰
     * @param type 이메일 타입
     */
    public void joinSendMail(EmailMessageDTO email, String token, String type) {
        
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(email.getSubject()); // 메일 제목

            String link = "http://localhost:8080/send-mail/verify?token=" + token;

            String htmlContent = loadEmailTemplate(link);

            mimeMessageHelper.setText(htmlContent, true); // HTML 여부 설정
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // 이메일 전송 메서드
    public String sendMail(EmailMessageDTO emailMessageDTO, String type) {
        String authNum = createCode();

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailMessageDTO.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(emailMessageDTO.getSubject()); // 메일 제목
            mimeMessageHelper.setText("ㅇㅇ"); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);

            return authNum;

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // 인증번호 및 임시 비밀번호 생성 메서드
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: key.append((char) ((int) random.nextInt(26) + 97)); break;
                case 1: key.append((char) ((int) random.nextInt(26) + 65)); break;
                default: key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }

    // 토큰 생성 메서드
    public String createToken() {
        return UUID.randomUUID().toString();
    }

    private String loadEmailTemplate(String link) {
        try {
            ClassPathResource resource = new ClassPathResource("/static/verification-email.html");
            String template = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return String.format(template, link);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load email template", e);
        }
    }
}