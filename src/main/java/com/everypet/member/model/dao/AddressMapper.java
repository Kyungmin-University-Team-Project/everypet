package com.everypet.member.model.dao;

import com.everypet.member.model.vo.Address;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AddressMapper {

    int insertAddress(Address address);

    int updateAddress(Address address);

    int deleteAddress(Address address);

    List<Address> selectAddressByMemberId(String memberId);

    int findAddressCountByMemberId(String memberId);
}
