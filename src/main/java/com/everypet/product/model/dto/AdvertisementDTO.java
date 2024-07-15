package com.everypet.product.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdvertisementDTO {

    private String advertisementId; // uuid
    private int advertisementSequence; // 광고 순서

}
