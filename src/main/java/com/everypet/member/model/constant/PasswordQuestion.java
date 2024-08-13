package com.everypet.member.model.constant;

import lombok.Getter;

@Getter
public enum PasswordQuestion {
    // 사용자가 선택할 수 있는 보안 질문
    MOTHER_MAIDEN_NAME("어머니의 본래 성씨는 무엇입니까?"),
    FIRST_PET_NAME("첫 반려동물의 이름은 무엇입니까?"),
    FIRST_SCHOOL("첫 번째 학교의 이름은 무엇입니까?"),
    FAVOURITE_TEACHER("가장 좋아했던 선생님의 이름은 무엇입니까?"),
    BIRTH_CITY("출생한 도시는 어디입니까?"),
    FAVOURITE_BOOK("가장 좋아하는 책의 제목은 무엇입니까?"),
    FAVOURITE_MOVIE("가장 좋아하는 영화의 제목은 무엇입니까?"),
    FATHER_BIRTHDAY("아버지의 생일은 언제입니까?");

    private final String questionText;

    PasswordQuestion(String questionText) {
        this.questionText = questionText;
    }

}