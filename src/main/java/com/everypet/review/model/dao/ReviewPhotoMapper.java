package com.everypet.review.model.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReviewPhotoMapper {
    int insertReviewPhoto(Map<String, Object> map);
    List<String> selectReviewPhotosByReviewId(Long reviewId);
    int deleteReviewPhotosByReviewId(Long reviewId);
}
