package com.everypet.support.service.impl;

import com.everypet.member.model.vo.Member;
import com.everypet.product.service.ProductService;
import com.everypet.support.model.dao.SellerInquiryMapper;
import com.everypet.support.model.dao.SellerInquiryReplyMapper;
import com.everypet.support.model.dto.SellerInquiryReplyDto.CreateSellerInquiryReply;
import com.everypet.support.model.dto.SellerInquiryReplyDto.UpdateSellerInquiryReply;
import com.everypet.support.model.entity.SellerInquiryReply;
import com.everypet.support.service.SellerInquiryReplyService;
import com.everypet.support.service.SellerInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerInquiryReplyServiceImpl implements SellerInquiryReplyService {

    private final SellerInquiryReplyMapper sellerInquiryReplyMapper;
    private final SellerInquiryMapper sellerInquiryMapper;

    private final SellerInquiryService sellerInquiryService;
    private final ProductService productService;

    @Override
    public void createSellerInquiryReply(CreateSellerInquiryReply reply, Member member) {

        validateSellerInquiry(reply, member);

        reply.setMemberId(member.getMemberId());

        sellerInquiryReplyMapper.insertSellerInquiryReply(reply);

        sellerInquiryService.completeSellerInquiry(reply.getSellerInquiryId(), reply.getSellerInquiryReplyId());

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

    private void validateSellerInquiry(CreateSellerInquiryReply reply, Member member) {

        if (sellerInquiryMapper.isReplyExist(reply.getSellerInquiryId())) {
            throw new RuntimeException("이미 답변이 작성된 문의입니다.");
        }

        if (!sellerInquiryMapper.isSellerInquiryExist(reply.getSellerInquiryId())) {
            throw new RuntimeException("존재하지 않는 문의입니다.");
        }

        String sellerID = productService.selectProductByProductId(reply.getProductId()).getMemberId();

        if (!sellerID.equals(member.getMemberId())) {
            throw new RuntimeException("상품 판매자만 문의 답변을 작성할 수 있습니다.");
        }

    }

}