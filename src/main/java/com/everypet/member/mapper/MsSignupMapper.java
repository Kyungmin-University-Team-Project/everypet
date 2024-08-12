package com.everypet.member.mapper;

import com.everypet.member.model.dto.SignupDTO;
import com.everypet.member.model.vo.Member;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsSignupMapper {

    MsSignupMapper INSTANCE = Mappers.getMapper(MsSignupMapper.class);

    SignupDTO toDto(Member vo);

    Member toVo(SignupDTO dto);

}
