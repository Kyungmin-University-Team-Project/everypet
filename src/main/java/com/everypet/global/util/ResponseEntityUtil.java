package com.everypet.global.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public final class ResponseEntityUtil {

    private ResponseEntityUtil() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * 표준화된 JSON ResponseEntity를 생성하는 유틸리티 메서드.
     *
     * @param data 응답의 본문, 일반적으로 JSON으로 변환될 객체.
     * @param status 응답과 함께 반환할 HTTP 상태 코드. (HttpStatus.OK, HttpStatus.BAD_REQUEST 등)
     * @return ResponseEntity 객체를 리턴합니다.
     * 사용 예시:
     * <pre>
     * {@code
     * ResponseEntity<MyResponseType> response = ResponseEntityUtil.response(myData, HttpStatus.OK);
     * }
     * </pre>
     */
    public static <T> ResponseEntity<T> response(T data, HttpStatus status) {
        return ResponseEntity.status(status)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(data);
    }

}