package com.everypet.member.mapper;

import com.everypet.member.model.dto.member.PasswordRecoveryDTO;
import com.everypet.member.model.vo.Member;
import com.everypet.member.model.vo.PasswordRecovery;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsPasswordRecovery {

    MsPasswordRecovery INSTANCE = Mappers.getMapper(MsPasswordRecovery.class);

    PasswordRecovery toVo(PasswordRecoveryDTO dto, Member member);
}
