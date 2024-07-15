package com.everypet.product.model.dao;

import com.everypet.product.model.vo.Advertisement;
import com.everypet.product.model.dto.AdvertisementDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface AdvertisementMapper {

    int incrementOrder(int sequence);
    int insertAdvertisement(Advertisement advertisement);
    List<AdvertisementDTO> selectAllAdvertisements();
    int deleteAdvertisement(String advertisementId);
    int updateAdvertisement(Advertisement advertisement);
    Optional<Advertisement> selectAdvertisementById(String advertisementId);

}