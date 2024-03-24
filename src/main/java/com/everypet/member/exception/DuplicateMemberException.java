package com.everypet.member.exception;

public class DuplicateMemberException extends RuntimeException{
    public DuplicateMemberException() {
        super();
    }

    public DuplicateMemberException(String message) {
        super("이미 존재하는 아이디 입니다. : " + message);
    }

    public DuplicateMemberException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateMemberException(Throwable cause) {
        super(cause);
    }
}
