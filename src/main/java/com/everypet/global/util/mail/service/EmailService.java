package com.everypet.global.util.mail.service;

import com.everypet.global.util.mail.data.dto.EmailMessageDTO;

public interface EmailService {

    void sendCode(EmailMessageDTO emailMessageDTO, int code);
    int createCode();
}
