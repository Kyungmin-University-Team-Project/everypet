package com.everypet.support.model.dao;

import com.everypet.global.util.PageableList;
import com.everypet.support.model.dto.SellInquirtyDTO.InsertSellInquiry;
import com.everypet.support.model.vo.SellerInquiry;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SellerInquiryMapper {

    void insertSellInquiry(InsertSellInquiry insertSellInquiry);

    @MapKey("sellInquiryId")
    List<SellerInquiry> selectSellInquiryList(PageableList pageableList);
}
