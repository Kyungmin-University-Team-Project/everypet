package com.everypet.support.controller;

import com.everypet.member.model.vo.Member;
import com.everypet.support.model.dto.SellerInquirtyDTO;
import com.everypet.support.model.dto.SellerInquirtyDTO.UpdateSellerInquiry;
import com.everypet.support.service.SellerInquiryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "판매자 문의 Api")
@RequestMapping("/support/seller/inquiry")
@RestController
@RequiredArgsConstructor
public class SellerInquiryController {

    private final SellerInquiryService sellerInquiryService;

    @PostMapping
    @ApiOperation(value = "판매자 문의 작성", notes = "로그인 한 상태로 판매자 문의를 작성해야 합니다. (access_token 필요)")
    public ResponseEntity<String> createSellerInquiry(@RequestBody SellerInquirtyDTO.InsertSellerInquiry insertSellerInquiry, @ApiIgnore @AuthenticationPrincipal Member member) {
        sellerInquiryService.createSellerInquiry(insertSellerInquiry, member);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/list/{productId}")
    @ApiOperation(
            value = "상품 별 판매자 문의 리스트 조회",
            notes = "지정된 product_id로 판매자 문의 리스트를 조회합니다.\n" +
                    "페이징 처리를 위해 다음 쿼리 파라미터를 사용할 수 있습니다:\n" +
                    "- **page**: 조회할 페이지 번호 (기본값: 0)\n" +
                    "- **size**: 한 페이지에 표시할 항목 수 (기본값: 10)\n" +
                    "- **sort**: DB에 정의된 컬럼명을 기준으로 정렬할 수 있습니다 (예: `INQUIRY_DATE,desc`)\n\n" +
                    "예시: `/support/seller/inquiry/list/{productId}?page=0&size=10&sort=INQUIRY_DATE,desc`")
    public ResponseEntity<?> getSellerInquiry(@PathVariable String productId, Pageable pageable) {
        return ResponseEntity.ok(sellerInquiryService.getSellInquiryList(productId, pageable));
    }

    @GetMapping("/list")
    @ApiOperation(
            value = "판매자 문의 전체 리스트 조회",
            notes = "모든 판매자 문의 리스트를 조회합니다.\n" +
                    "페이징 처리를 위해 다음 쿼리 파라미터를 사용할 수 있습니다:\n" +
                    "- **page**: 조회할 페이지 번호 (기본값: 0)\n" +
                    "- **size**: 한 페이지에 표시할 항목 수 (기본값: 10)\n" +
                    "- **sort**: DB에 정의된 컬럼명을 기준으로 정렬할 수 있습니다 (예: `INQUIRY_DATE,desc`)\n\n" +
                    "예시: `/support/seller/inquiry/list/all?page=0&size=10&sort=INQUIRY_DATE,desc`")
    public ResponseEntity<?> getAllSellerInquiry(Pageable pageable) {
        return ResponseEntity.ok((sellerInquiryService.getAllSellerInquiryList(pageable)));
    }

    @DeleteMapping("/{inquiryId}")
    @ApiOperation(value = "판매자 문의 삭제", notes = "로그인 한 상태로 판매자 문의를 삭제해야 합니다. (access_token 필요)")
    public ResponseEntity<String> deleteSellerInquiry(@PathVariable Long inquiryId, @ApiIgnore @AuthenticationPrincipal Member member) {
        sellerInquiryService.deleteSellerInquiry(inquiryId, member);
        return ResponseEntity.ok("success");
    }

    @PatchMapping("/{inquiryId}")
    @ApiOperation(value = "판매자 문의 수정", notes = "로그인 한 상태로 판매자 문의를 수정해야 합니다. (access_token 필요)")
    public ResponseEntity<String> updateSellerInquiry(@PathVariable Long inquiryId, @RequestBody UpdateSellerInquiry updateSellerInquiry, @ApiIgnore @AuthenticationPrincipal Member member) {
        sellerInquiryService.updateSellerInquiry(inquiryId, updateSellerInquiry, member);
        return ResponseEntity.ok("success");
    }

}