package com.everypet.payment.model.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface PaymentMapper {
    int insertPayment(Map<String, Object> map);
}
