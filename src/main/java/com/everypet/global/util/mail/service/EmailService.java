package com.everypet.global.util.mail.service;

import com.everypet.global.util.mail.model.constant.Purpose;
import com.everypet.global.util.mail.model.dto.VerificationDTO;

import java.util.List;

public interface EmailService {
        void sendEmail(List<String> to, String subject, String templatePath, Object... args);
        void sendCode(String email, Purpose purpose);
        boolean verifyCode(VerificationDTO verification);
        void deleteCode(VerificationDTO verification);
}