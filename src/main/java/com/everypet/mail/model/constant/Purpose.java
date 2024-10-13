package com.everypet.mail.model.constant;

public enum Purpose {

    SIGNUP("[EVERY-PET] 회원가입을 위한 코드입니다."),
    PASSWORD_CHANGE("[EVERY-PET] 비밀번호 변경을 위한 코드입니다."),
    PASSWORD_FIND("[EVERY-PET] 비밀번호 찾기를 위한 코드입니다."),
    DELETE_ACCOUNT("[EVERY-PET] 회원탈퇴를 위한 코드입니다."),
    ID_FIND("[EVERY-PET] 아이디 찾기를 위한 코드입니다."),

    SIGNUP_WELCOME("[EVERY-PET] 회원가입 축하드립니다."),
    TEMPORARY_PASSWORD("[EVERY-PET] 임시 비밀번호입니다.");

    private final String subject;

    Purpose(String subject) {
        this.subject = subject;
    }

    public String getSubject() {
        return subject;
    }

}
