package com.everypet.global.util.point.mapper;

import com.everypet.global.util.point.model.dto.PointDTO;
import com.everypet.global.util.point.model.vo.Point;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsPointMapper {

    MsPointMapper INSTANCE = Mappers.getMapper(MsPointMapper.class);

    Point toVo(PointDTO dto);

}
