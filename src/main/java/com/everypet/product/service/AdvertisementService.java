package com.everypet.product.service;

import com.everypet.product.model.domain.Advertisement;
import com.everypet.product.model.vo.AdvertisementDTO;
import com.everypet.product.model.vo.InsertAdvertisementDTO;
import com.everypet.product.model.vo.UpdateAdvertisementDTO;

import java.util.List;

public interface AdvertisementService {
    void insertAdvertisement(InsertAdvertisementDTO insertAdvertisementDto);
    List<AdvertisementDTO> selectAllAdvertisements();
    void deleteAdvertisement(String advertisementId);
    void updateAdvertisement(UpdateAdvertisementDTO updateAdvertisementDTO);
    Advertisement selectAdvertisementById(String advertisementId);
}
