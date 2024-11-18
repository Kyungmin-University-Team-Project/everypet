package com.everypet.support.service;

import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dto.SellerInquirtyDTO;
import com.everypet.support.model.dto.SellerInquirtyDTO.UpdateSellerInquiry;
import com.everypet.support.model.entity.SellerInquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SellerInquiryService {

    void createSellerInquiry(SellerInquirtyDTO.InsertSellerInquiry insertSellerInquiry, Member member);

    Page<SellerInquiry> getSellInquiryList(String productId, Pageable pageable);

    Page<SellerInquiry> getAllSellerInquiryList(Pageable pageable);

    void deleteSellerInquiry(Long inquiryId, Member member);

    void updateSellerInquiry(Long inquiryId, UpdateSellerInquiry updateSellerInquiry, Member member);

    void completeSellerInquiry(Long sellerInquiryId, Long sellerInquiryReplyId);
}
