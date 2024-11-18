package com.everypet.support.service;

import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dto.SellerInquiryReplyDto.CreateSellerInquiryReply;
import com.everypet.support.model.dto.SellerInquiryReplyDto.UpdateSellerInquiryReply;

public interface SellerInquiryReplyService {

    void createSellerInquiryReply(CreateSellerInquiryReply reply, Member member);

    void updateSellerInquiryReply(Long replyId, UpdateSellerInquiryReply reply, Member member);

    void deleteSellerInquiryReply(Long replyId, Member member);

}
