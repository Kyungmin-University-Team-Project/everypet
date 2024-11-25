package com.everypet.review.controller;

import com.everypet.review.model.dto.ReviewDTO;
import com.everypet.review.model.dto.ReviewHelpfulDTO;
import com.everypet.review.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Api(tags = "상품 리뷰 Api")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product-review")
public class ReviewController {

    private final ReviewService reviewService;

    @ApiOperation(value = "상품 리뷰 추가", notes = "새로운 상품 리뷰를 추가합니다.")
    @PostMapping("/insert")
    public ResponseEntity<String> insertProductInfo(@ModelAttribute ReviewDTO.InsertProductReviewDTO insertProductReviewDTO,
                                                    @RequestParam("productReviewImages") List<MultipartFile> productReviewImages) {
        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            reviewService.insertProductReview(memberId, insertProductReviewDTO, productReviewImages);

            log.info("{} {} 리뷰 등록 완료", memberId, insertProductReviewDTO.getProductId());
            return ResponseEntity.ok("리뷰 등록 완료");
        }catch (Exception e){
            log.error("{} {} 리뷰 등록 실패", memberId, insertProductReviewDTO.getProductId(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("리뷰 등록 실패: " + e.getMessage());
        }
    }

    @ApiOperation(value = "리뷰 삭제", notes = "reviewId를 보내면 삭제합니다.")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteReview(Long reviewId) {
        try {
            reviewService.deleteProductReview(reviewId);
            return ResponseEntity.ok("리뷰 삭제 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("리뷰 삭제 실패: " + e.getMessage());
        }
    }
    @ApiOperation(value = "해당 상품의 리뷰 리스트를 조회. ", notes = "상품ID로 해당 상품의 리뷰 리스트를 조회합니다.\n" +
            "orderBy(정렬) : latest(최신순), oldest(오래된순), most_helpful(도움 됨 + 도움 안됨 많은 순), least_helpful(도움 됨 + 도움 안됨 적은 순)")
    @GetMapping("/list/{productId}/{orderBy}/{page}/{pageSize}")
    public List<ReviewDTO.ProductReviewDTO> getReviewsByProduct(
            @PathVariable String productId,
            @PathVariable String orderBy,
            @PathVariable int page,
            @PathVariable int pageSize){  // DTO로 요청 처리
        try {
            List<ReviewDTO.ProductReviewDTO> reviews = reviewService.getReviewsByProductIdWithHelpful(productId, orderBy, page, pageSize);

            return reviews;
        } catch (Exception e) {
            log.error("리뷰 조회 실패: {}", e.getMessage());
            return null;
        }
    }

    @ApiOperation(value = "리뷰 단건 조회", notes = "리뷰 ID로 단건 리뷰 상세 정보를 조회합니다.")
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO.ProductReviewDTO> getReviewById(@PathVariable Long reviewId) {
        ReviewDTO.ProductReviewDTO review = reviewService.getReviewByReviewId(reviewId);
        return ResponseEntity.ok(review);
    }

    @PostMapping("/helpful-insert")
    public ResponseEntity<String> markReviewHelpful(@Valid @RequestBody ReviewHelpfulDTO reviewHelpfulDTO) {

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            reviewService.markReviewHelpful(memberId, reviewHelpfulDTO);
            return ResponseEntity.ok("Review helpful status updated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update helpful status.");
        }
    }

    @DeleteMapping("/helpful-cancel")
    public ResponseEntity<String> cancelHelpfulReview(@RequestBody Long reviewId) {

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            reviewService.cancelHelpfulReview(memberId, reviewId);
            return ResponseEntity.ok("Helpful status cancelled.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to cancel helpful status.");
        }
    }
}
