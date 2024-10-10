package com.everypet.keyword.mapper;

import com.everypet.keyword.model.dto.KeywordRankDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsKeywordRankMapper {

    MsKeywordRankMapper INSTANCE = Mappers.getMapper(MsKeywordRankMapper.class);

    @Mapping(target = "totalCount", constant = "1")
    @Mapping(target = "oneHourScore", constant = "1")
    @Mapping(target = "dailyScore", constant = "1")
    @Mapping(target = "weeklyScore", constant = "1")
    @Mapping(target = "totalScore", constant = "0")
    KeywordRankDTO toSearchRecord(String keyword);

}
