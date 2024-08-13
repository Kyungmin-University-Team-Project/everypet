package com.everypet.global.util.mail.service.impl;

import com.everypet.global.util.mail.model.constant.Purpose;
import com.everypet.global.util.mail.model.dto.VerificationDTO;
import com.everypet.global.util.mail.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${email.template.verification}")
    String templatePath;

    /**
     * 주어진 수신자 목록에게 지정된 제목과 내용을 가진 이메일을 보냅니다.
     * 이메일의 내용은 제공된 템플릿과 인자를 기반으로 포맷팅됩니다.
     * <p>자세한 사용법은 {@link com.everypet.member.service.impl.MemberServiceImpl MemberServiceImpl} 클래스를 참고하세요.</p>
     *
     * @param to            수신자 이메일 주소 목록. 여러 개의 이메일 주소를 전달할 수 있으며, 하나의 이메일 주소만 전달하려면 {@link java.util.Collections#singletonList(Object)} 메서드를 사용하세요.
     * @param subject       이메일 제목
     * @param templatePath  이메일 템플릿 파일의 경로 (예: classpath:/templates/email/verification.html)
     * @param args          템플릿을 포맷팅하기 위한 인자들. 인자는 하나로만 전달해도 되며, 배열로 감싸지 않아도 됩니다.
     * @throws RuntimeException 이메일 발송 중 오류가 발생한 경우
     *
     *
     * <p>사용 예시:</p>
     * <pre>
     * {@code
     * List<String> to = Arrays.asList("user1@example.com", "user2@example.com");
     * String subject = "Welcome!";
     * String templatePath = "templates/welcome-email.html";
     * Object[] args = {"John", "Doe"};
     *
     * emailService.sendEmail(to, subject, templatePath, args);
     * }
     * </pre>
     */
    @Override
    public void sendEmail(List<String> to, String subject, String templatePath, Object... args) {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            for(String email : to) {
                helper.addTo(email); // 메일 수신자
            }

            helper.setSubject(subject); // 메일 제목

            String content = loadAndFormatTemplate(templatePath, args);

            helper.setText(content, true); // HTML 여부 설정

            mailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    // 쳄플릿 로딩 및 포맷팅
    private String loadAndFormatTemplate(String templatePath, Object... args) throws IOException {
        ClassPathResource resource = new ClassPathResource(templatePath);
        String template = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        return String.format(template, args);
    }

    /**
     * 이메일 인증 코드를 생성하고, 주어진 이메일 주소로 전송합니다. 인증 코드는 5분간 유효합니다. (5분이 지나면 만료됨)
     * sendCode 메소드는 내부적으로 {@link #sendEmail(List, String, String, Object...)} 메서드를 호출하여 이메일을 전송합니다.
     *
     * @param email 이메일 주소
     * @param purpose 인증 코드의 목적 (회원가입, 비밀번호 찾기 등)
     *
     */
    @Override
    public void sendCode(String email, Purpose purpose) {

        SecureRandom random = new SecureRandom();
        int code = random.nextInt(9000) + 1000;

        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        String redisKey = purpose.name() + ":" + code;

        valueOps.set(redisKey, email, Duration.ofMinutes(5)); // 5분간 유효

        String subject = getSubjectForPurpose(purpose);

        sendEmail(Collections.singletonList(email), subject, templatePath, code);

    }

    private String getSubjectForPurpose(Purpose purpose) {
        switch (purpose) {
            case SIGNUP:
                return "[EVERY-PET] 회원가입을 위한 코드입니다.";
            case PASSWORD_CHANGE:
                return "[EVERY-PET] 비밀번호 변경을 위한 코드입니다.";
            case PASSWORD_FIND:
                return "[EVERY-PET] 비밀번호 찾기를 위한 코드입니다.";
            case DELETE_ACCOUNT:
                return "[EVERY-PET] 회원탈퇴를 위한 코드입니다.";
            default:
                throw new IllegalArgumentException("Unknown purpose: " + purpose);
        }
    }

     /**
     * 주어진 인증 정보를 사용하여 인증 코드를 확인합니다.
     * 인증 코드가 일치하면 true를 반환하고, 그렇지 않으면 false를 반환합니다.
     * 인증 코드가 확인되면, 해당 인증 코드는 {@link #deleteCode(VerificationDTO)} 메소드를 사용하여 삭제해야 합니다.
     *
     * @param verification 인증 정보 DTO (인증 코드와 목적 포함)
     * @return 인증 코드가 유효하면 true, 그렇지 않으면 false
     */
    @Override
    public boolean verifyCode(VerificationDTO verification) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        String redisKey = verification.getPurpose().name() + ":" + verification.getCode();
        String email = valueOps.get(redisKey);

        return email != null;
    }

    /**
     * 주어진 인증 정보를 사용하여 인증 코드를 삭제합니다.
     *
     * @param verification 인증 정보 DTO (인증 코드와 목적 포함)
     */
    @Override
    public void deleteCode(VerificationDTO verification) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();

        String redisKey = verification.getPurpose().name() + ":" + verification.getCode();
        valueOps.getOperations().delete(redisKey);
    }

}