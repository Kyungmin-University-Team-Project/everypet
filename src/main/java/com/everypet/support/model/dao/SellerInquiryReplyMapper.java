package com.everypet.support.model.dao;

import com.everypet.support.model.dto.SellerInquiryReplyDto.CreateSellerInquiryReply;
import com.everypet.support.model.entity.SellerInquiryReply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SellerInquiryReplyMapper {

    Long insertSellerInquiryReply(CreateSellerInquiryReply reply);

    void updateSellerInquiryReply(SellerInquiryReply reply);

    void deleteSellerInquiryReply(@Param("sellerInquiryReplyId") Long sellerInquiryReplyId, @Param("memberId") String memberId);

}
