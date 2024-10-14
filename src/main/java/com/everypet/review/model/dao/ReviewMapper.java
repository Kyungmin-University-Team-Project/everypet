package com.everypet.review.model.dao;

import com.everypet.review.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReviewMapper {
    int insertReview(Map<String, Object> map);
    int deleteReviewById(Long reviewId);
    List<ReviewDTO.ProductReviewDTO> selectReviewsByProductId(Map<String, Object> params);
    ReviewDTO.ProductReviewDTO selectReviewByReviewId(Long reviewId);
}
