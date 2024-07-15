package com.everypet.product.service;

import com.everypet.product.model.vo.Advertisement;
import com.everypet.product.model.dto.AdvertisementDTO;
import com.everypet.product.model.dto.InsertAdvertisementDTO;
import com.everypet.product.model.dto.UpdateAdvertisementDTO;

import java.util.List;

public interface AdvertisementService {
    void insertAdvertisement(InsertAdvertisementDTO insertAdvertisementDto);
    List<AdvertisementDTO> selectAllAdvertisements();
    void deleteAdvertisement(String advertisementId);
    void updateAdvertisement(UpdateAdvertisementDTO updateAdvertisementDTO);
    Advertisement selectAdvertisementById(String advertisementId);
}
