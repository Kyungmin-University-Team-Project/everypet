package com.everypet.review.model.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ReviewHelpfulMapper {
    int insertHelpfulReview(Map<String, Object> params);
    int updateHelpfulReview(Map<String, Object> params);
    int deleteHelpfulReview(Map<String, Object> params);
    int checkIfAlreadyHelpful(Map<String, Object> params);
}
