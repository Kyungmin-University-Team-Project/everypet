package com.everypet.product.model.dao;

import com.everypet.product.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {

    int insertProduct(Map<String, Object> map);
    int deleteProductByProductId(String productId);
    List<ProductListDTO> selectProductList(Map<String, Object> map);
    ProductListDTO selectProductByProductId(String productId);
    String selectMemberIdByProductId(String productId);
    int updateProduct(Map<String, Object> map);
    boolean incrementProductViews(String productId);
    List<ProductListDTO> searchProductListByKeyword(Map<String, Object> map);
    List<String> autocompleteKeyword(String keyword);
    int insertProductKeyword(Map<String, Object> map);
    int deleteProductKeyword(Map<String, Object> map);
    int selectDiscountedProductPriceByProductId(String productId);
    List<ProductListDTO> selectProductListByBrand(Map<String, Object> map);
}
