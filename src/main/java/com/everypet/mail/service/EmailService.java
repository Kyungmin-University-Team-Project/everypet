package com.everypet.mail.service;

import com.everypet.mail.model.constant.Purpose;
import com.everypet.mail.model.dto.VerificationDTO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface EmailService {
        void sendEmail(List<String> to, String subject, String templatePath, Object... args);
        void sendCode(String email, Purpose purpose, HttpServletRequest request);
        boolean verifyCode(VerificationDTO verification, HttpServletRequest request);
}