package com.everypet.support.model.dao;

import com.everypet.global.util.PageableList;
import com.everypet.support.model.dto.SellerInquirtyDTO.InsertSellerInquiry;
import com.everypet.support.model.dto.SellerInquirtyDTO.UpdateSellerInquiry;
import com.everypet.support.model.entity.SellerInquiry;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Mapper
public interface SellerInquiryMapper {

    void insertSellerInquiry(InsertSellerInquiry insertSellerInquiry);

    @MapKey("sellInquiryId")
    List<SellerInquiry> selectSellerInquiryList(PageableList pageableList);

    List<SellerInquiry> selectAllSellerInquiryList(Pageable pageableList);

    void deleteSellerInquiry(@Param("inquiryId") Long inquiryId, @Param("memberId") String memberId);

    void updateSellerInquiry(@Param("inquiryId") Long inquiryId, @Param("updateSellerInquiry") UpdateSellerInquiry updateSellerInquiry, @Param("memberId") String memberId);

    void completeSellerInquiry(@Param("sellerInquiryId") Long sellerInquiryId, @Param("sellerInquiryReplyId") Long sellerInquiryReplyId);

    boolean isReplyExist(@Param("sellerInquiryId") Long sellerInquiryId);

    boolean isSellerInquiryExist(@Param("sellerInquiryId") Long sellerInquiryId);

}
