package com.everypet.keyword.model.dao;

import com.everypet.keyword.model.vo.KeywordLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface KeywordLogMapper {
    void saveKeywordLog(@Param("keyword") String keyword, @Param("memberId") String memberId);
    List<KeywordLog> findAllKeywordLog();
}
