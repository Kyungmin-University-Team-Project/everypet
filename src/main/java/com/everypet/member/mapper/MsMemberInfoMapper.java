package com.everypet.member.mapper;

import com.everypet.member.model.dto.MemberInfoDTO;
import com.everypet.member.model.vo.Member;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsMemberInfoMapper {
    MsMemberInfoMapper INSTANCE = Mappers.getMapper(MsMemberInfoMapper.class);

    MemberInfoDTO toDto(Member vo);

    Member toVo(MemberInfoDTO dto);

}
