package com.everypet.keyword.service.impl;

import com.everypet.keyword.model.dao.KeywordLogMapper;
import com.everypet.keyword.model.vo.KeywordLog;
import com.everypet.keyword.service.KeywordLogService;
import com.everypet.member.model.vo.Member;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordLogServiceImpl implements KeywordLogService {

    private static final Logger log = LogManager.getLogger(KeywordLogServiceImpl.class);
    private final KeywordLogMapper keywordLogMapper;

    @Override
    public void saveKeywordLog(String keyword, Member member) {

         if (member != null) {
             keywordLogMapper.saveKeywordLog(keyword, member.getMemberId());
         } else {
                keywordLogMapper.saveKeywordLog(keyword, "anonymous");
         }

    }

    @Override
    public List<KeywordLog> findAllKeywordLog() {
       return keywordLogMapper.findAllKeywordLog();
    }
}
