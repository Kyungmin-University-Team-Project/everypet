package com.everypet.global.util;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Pageable;

@Data
@Builder
public class PageableList<T> {

    private T data;
    private Pageable pageable;

    public static <T> PageableList<T> of(T data, Pageable pageable) {
        return PageableList.<T>builder()
                .data(data)
                .pageable(pageable)
                .build();
    }

}
