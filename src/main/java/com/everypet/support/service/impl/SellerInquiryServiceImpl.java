package com.everypet.support.service.impl;

import com.everypet.global.util.PageableList;
import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dao.SellerInquiryMapper;
import com.everypet.support.model.dto.SellerInquirtyDTO.InsertSellerInquiry;
import com.everypet.support.model.dto.SellerInquirtyDTO.UpdateSellerInquiry;
import com.everypet.support.model.entity.SellerInquiry;
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
    public void createSellerInquiry(InsertSellerInquiry insertSellerInquiry, Member member) {
        insertSellerInquiry.setMemberId(member.getMemberId());
        sellerInquiryMapper.insertSellerInquiry(insertSellerInquiry);
    }

    @Override
    public Page<SellerInquiry> getSellInquiryList(String productId, Pageable pageable) {

        PageableList<?> pageableList = PageableList.of(productId, pageable);

        List<SellerInquiry> inquiries = sellerInquiryMapper.selectSellerInquiryList(pageableList);

        return new PageImpl<>(inquiries, pageable, inquiries.size());


    }

    @Override
    public Page<SellerInquiry> getAllSellerInquiryList(Pageable pageable) {

        //PageableList<?> pageableList = PageableList.of(null, pageable);

        List<SellerInquiry> inquiries = sellerInquiryMapper.selectAllSellerInquiryList(pageable);

        return new PageImpl<>(inquiries, pageable, inquiries.size());
    }

    @Override
    public void deleteSellerInquiry(Long inquiryId, Member member) {
        sellerInquiryMapper.deleteSellerInquiry(inquiryId, member.getMemberId());
    }

    @Override
    public void updateSellerInquiry(Long inquiryId, UpdateSellerInquiry updateSellerInquiry, Member member) {
        sellerInquiryMapper.updateSellerInquiry(inquiryId, updateSellerInquiry, member.getMemberId());
    }

    @Override
    public void completeSellerInquiry(Long sellerInquiryId, Long sellerInquiryReplyId) {
        sellerInquiryMapper.completeSellerInquiry(sellerInquiryId, sellerInquiryReplyId);
    }

}