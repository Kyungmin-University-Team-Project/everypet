package com.everypet.member.exception;

public class MemberIdNotFoundException extends RuntimeException{
    public MemberIdNotFoundException() {
        super();
    }

    public MemberIdNotFoundException(String message) {
        super("해당 아이디는 존재하지 않습니다. : " + message + ")");
    }

    public MemberIdNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MemberIdNotFoundException(Throwable cause) {
        super(cause);
    }
}
