package com.everypet.review.service;

import com.everypet.review.model.dto.ReviewDTO;
import com.everypet.review.model.dto.ReviewHelpfulDTO;

import java.util.List;

public interface ReviewService {
    void insertProductReview(String memberId, ReviewDTO.InsertProductReviewDTO insertProductReviewDTO);
    void deleteProductReview(Long reviewId);
    List<ReviewDTO.ProductReviewDTO> getReviewsByProductIdWithHelpful(String productId, String orderBy, int page, int pageSize);
    void markReviewHelpful(String memberId, ReviewHelpfulDTO reviewHelpfulDTO);
    void cancelHelpfulReview(String memberId, Long reviewId);
    ReviewDTO.ProductReviewDTO getReviewByReviewId(Long reviewId);
}