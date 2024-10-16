package com.everypet.keyword.service;

import com.everypet.keyword.model.vo.KeywordLog;
import com.everypet.member.model.vo.Member;

import java.util.List;

public interface KeywordLogService {
    void saveKeywordLog(String keyword, Member member);
    List<KeywordLog> findAllKeywordLog();
}
