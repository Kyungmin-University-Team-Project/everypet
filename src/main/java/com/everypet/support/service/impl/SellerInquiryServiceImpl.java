package com.everypet.support.service.impl;

import com.everypet.global.util.PageableList;
import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dao.SellerInquiryMapper;
import com.everypet.support.model.dto.SellInquirtyDTO.InsertSellInquiry;
import com.everypet.support.model.vo.SellerInquiry;
import com.everypet.support.service.SellerInquiryService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerInquiryServiceImpl implements SellerInquiryService {

    private static final Logger log = LogManager.getLogger(SellerInquiryServiceImpl.class);
    private final SellerInquiryMapper sellerInquiryMapper;

    @Override
    public void createSellerInquiry(InsertSellInquiry insertSellInquiry, Member member) {

        if(member == null) {
            log.error("로그인이 필요합니다.");
            // 나중에 수정
            throw new RuntimeException("로그인이 필요합니다.");
        }

        insertSellInquiry.setMemberId(member.getMemberId());
        sellerInquiryMapper.insertSellInquiry(insertSellInquiry);
    }

    @Override
    public Page<SellerInquiry> getSellInquiryList(String productId, Pageable pageable) {

        PageableList<?> pageableList = PageableList.of(productId, pageable);

        List<SellerInquiry> inquiries = sellerInquiryMapper.selectSellInquiryList(pageableList);

        return new PageImpl<>(inquiries, pageable, inquiries.size());


    }

}