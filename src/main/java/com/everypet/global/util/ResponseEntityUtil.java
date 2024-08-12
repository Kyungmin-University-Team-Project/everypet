package com.everypet.global.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public final class ResponseEntityUtil {

    private ResponseEntityUtil() {
        throw new IllegalStateException("Utility class");
    }

    public static <T> ResponseEntity<T> response(T data, HttpStatus status) {
        return ResponseEntity.status(status)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(data);
    }

}