package com.everypet.global.util.mail.service.impl;

import com.everypet.global.util.mail.model.constant.Purpose;
import com.everypet.global.util.mail.model.dto.VerificationDTO;
import com.everypet.global.util.mail.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final StringRedisTemplate redisTemplate;

    @Override
    public void sendEmail(List<String> to, String subject, String templatePath, Object... args) {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            for(String email : to) {
                helper.addTo(email); // 메일 수신자
            }

            helper.setSubject(subject); // 메일 제목

            // 템플릿 로딩 및 포맷팅
            ClassPathResource resource = new ClassPathResource(templatePath);
            String template = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            String content = String.format(template, args);

            helper.setText(content, true); // HTML 여부 설정

            mailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    @Override
    public void sendCode(String email, String subject, String templatePath, Purpose purpose) {

        int code = createCode();

        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        String redisKey = purpose.name() + ":" + code;

        valueOps.set(redisKey, email, Duration.ofMinutes(5)); // 5분간 유효

        List<String> emailList = Collections.singletonList(email);

        sendEmail(emailList, subject, templatePath, code);

    }

    @Override
    public boolean verifyCode(VerificationDTO verification) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        String redisKey = verification.getPurpose().name() + ":" + verification.getCode();
        String email = valueOps.get(redisKey);

        if (email != null) {
            redisTemplate.delete(redisKey);
            return true;
        } else {
            return false;
        }
    }

    public int createCode() {
        SecureRandom random = new SecureRandom();
        return random.nextInt(9000) + 1000;
    }
}