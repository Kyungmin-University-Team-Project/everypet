package com.everypet.support.service.impl;

import com.everypet.member.model.vo.Member;
import com.everypet.product.service.ProductService;
import com.everypet.support.model.dao.SellerInquiryMapper;
import com.everypet.support.model.dao.SellerInquiryReplyMapper;
import com.everypet.support.model.dto.SellerInquiryReplyDto.CreateSellerInquiryReply;
import com.everypet.support.model.dto.SellerInquiryReplyDto.UpdateSellerInquiryReply;
import com.everypet.support.model.entity.SellerInquiryReply;
import com.everypet.support.service.SellerInquiryReplyService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerInquiryReplyServiceImpl implements SellerInquiryReplyService {

    private static final Logger log = LogManager.getLogger(SellerInquiryReplyServiceImpl.class);
    private final SellerInquiryReplyMapper sellerInquiryReplyMapper;
    private final SellerInquiryMapper sellerInquiryMapper;

    private final ProductService productService;

    @Override
    public Long createSellerInquiryReply(CreateSellerInquiryReply reply, Member member) {

        if(sellerInquiryMapper.isReplyExist(reply.getSellerInquiryId())) {
            throw new RuntimeException("이미 답변이 작성된 문의입니다.");
        }

        if(!sellerInquiryMapper.isSellerInquiryExist(reply.getSellerInquiryId())) {
            throw new RuntimeException("존재하지 않는 문의입니다.");
        }

        if(!productService.selectProductByProductId(reply.getProductId()).getMemberId().equals(member.getMemberId())) {
            throw new RuntimeException("상품 판매자만 문의 답변을 작성할 수 있습니다.");
        }

        reply.setMemberId(member.getMemberId());

        return sellerInquiryReplyMapper.insertSellerInquiryReply(reply);
    }

    @Override
    public void updateSellerInquiryReply(Long replyId, UpdateSellerInquiryReply reply, Member member) {

        SellerInquiryReply entity = UpdateSellerInquiryReply.toEntity(replyId, reply.getReplyContents(), member.getMemberId());

        sellerInquiryReplyMapper.updateSellerInquiryReply(entity);
    }

    @Override
    public void deleteSellerInquiryReply(Long replyId, Member member) {
        sellerInquiryReplyMapper.deleteSellerInquiryReply(replyId, member.getMemberId());
    }


}