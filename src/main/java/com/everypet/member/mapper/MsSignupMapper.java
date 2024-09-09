package com.everypet.member.mapper;

import com.everypet.member.model.dto.member.FindIdDTO;
import com.everypet.member.model.dto.member.SignupDTO;
import com.everypet.member.model.vo.Member;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsSignupMapper {

    MsSignupMapper INSTANCE = Mappers.getMapper(MsSignupMapper.class);

    Member toVo(SignupDTO dto);

    Member toVo(FindIdDTO dto);
}
