package com.everypet.point.mapper;

import com.everypet.point.model.dto.PointDTO;
import com.everypet.point.model.vo.Point;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MsPointMapper {

    MsPointMapper INSTANCE = Mappers.getMapper(MsPointMapper.class);

    Point toVo(PointDTO dto);

}
