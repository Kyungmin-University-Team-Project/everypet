package com.everypet.global.util.mail.service;

import com.everypet.global.util.mail.data.dto.EmailMessageDTO;

public interface EmailService {

    void joinSendMail(EmailMessageDTO email, String token, String type);
    String sendMail(EmailMessageDTO emailMessageDTO, String type);
    String createCode();
    String createToken();

}
