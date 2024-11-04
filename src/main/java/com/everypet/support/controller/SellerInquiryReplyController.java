package com.everypet.support.controller;

import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dto.SellerInquiryReplyDto.CreateSellerInquiryReply;
import com.everypet.support.model.dto.SellerInquiryReplyDto.UpdateSellerInquiryReply;
import com.everypet.support.service.SellerInquiryReplyService;
import com.everypet.support.service.SellerInquiryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Api(tags = "판매자 문의 답변 Api")
@RestController
@RequiredArgsConstructor
@RequestMapping("/support/seller/inquiry/reply")
public class SellerInquiryReplyController {

    private static final Logger log = LogManager.getLogger(SellerInquiryReplyController.class);
    private final SellerInquiryReplyService sellerInquiryReplyService;
    private final SellerInquiryService sellerInquiryService;

    @PostMapping
    @ApiOperation(value = "판매자 문의 답변 작성", notes = "판매자 문의에 대한 답변을 작성합니다.")
    public ResponseEntity<String> createSellerInquiryReply(@RequestBody CreateSellerInquiryReply reply, @AuthenticationPrincipal Member member) {

        // 판매자 문의 답변 작성
        sellerInquiryReplyService.createSellerInquiryReply(reply, member);

        // 판매자 문의 답변 완료 처리
        sellerInquiryService.completeSellerInquiry(reply.getSellerInquiryId(), reply.getSellerInquiryReplyId());

        return ResponseEntity.ok("success");

    }

    @PatchMapping("/{replyId}")
    @ApiOperation(value = "판매자 문의 답변 수정", notes = "판매자 문의에 대한 답변을 수정합니다.")
    public ResponseEntity<String> updateSellerInquiryReply(@PathVariable Long replyId, @RequestBody UpdateSellerInquiryReply reply, @AuthenticationPrincipal Member member) {
        // 판매자 문의 답변 수정
        sellerInquiryReplyService.updateSellerInquiryReply(replyId, reply, member);

        return ResponseEntity.ok("success");

    }

    @DeleteMapping("/{replyId}")
    @ApiOperation(value = "판매자 문의 답변 삭제", notes = "판매자 문의에 대한 답변을 삭제합니다.")
    public ResponseEntity<String> deleteSellerInquiryReply(@PathVariable Long replyId, @AuthenticationPrincipal Member member) {
        // 판매자 문의 답변 삭제
        sellerInquiryReplyService.deleteSellerInquiryReply(replyId, member);

        return ResponseEntity.ok("success");

    }
}
