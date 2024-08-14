package com.everypet.global.util;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class PasswordGenerator {

    private PasswordGenerator() {
        throw new IllegalStateException("Utility class");
    }

    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    private static final String ALL_CHARACTERS = LOWERCASE + UPPERCASE + DIGITS + SPECIAL_CHARACTERS;
    private static final SecureRandom random = new SecureRandom();

    public static String generateRandomPassword(int length) {
        if (length < 8) {
            throw new IllegalArgumentException("비밀번호 길이는 8자 이상이어야 합니다.");
        }

        // 비밀번호에 필수 유형이 하나 이상 포함되어 있는지 확인하세요.
        StringBuilder password = new StringBuilder();
        password.append(getRandomChar(LOWERCASE));
        password.append(getRandomChar(UPPERCASE));
        password.append(getRandomChar(DIGITS));
        password.append(getRandomChar(SPECIAL_CHARACTERS));

        // 나머지 비밀번호 길이를 임의의 문자로 채웁니다.
        String remainingCharacters = ALL_CHARACTERS;
        while (password.length() < length) {
            password.append(getRandomChar(remainingCharacters));
        }

        // 무작위성을 보장하기 위해 문자를 섞습니다.
        List<Character> characters = new ArrayList<>();
        for (int i = 0; i < password.length(); i++) {
            characters.add(password.charAt(i));
        }
        Collections.shuffle(characters, random);

        // 문자 목록을 다시 문자열로 변환합니다.
        StringBuilder shuffledPassword = new StringBuilder();
        for (Character c : characters) {
            shuffledPassword.append(c);
        }

        return shuffledPassword.toString();
    }

    private static char getRandomChar(String chars) {
        int index = random.nextInt(chars.length());
        return chars.charAt(index);
    }

}
