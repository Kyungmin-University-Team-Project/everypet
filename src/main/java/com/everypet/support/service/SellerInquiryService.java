package com.everypet.support.service;

import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dto.SellInquirtyDTO.InsertSellInquiry;
import com.everypet.support.model.vo.SellerInquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SellerInquiryService {

    void createSellerInquiry(InsertSellInquiry insertSellInquiry, Member member);
    Page<SellerInquiry> getSellInquiryList(String productId, Pageable pageable);

}
