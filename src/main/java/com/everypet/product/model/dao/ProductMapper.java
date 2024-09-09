package com.everypet.product.model.dao;

import com.everypet.product.model.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {

    int insertProduct(Map<String, Object> map);
    int deleteProductByProductId(String productId);
    List<ProductListDTO> selectProduct(SelectProductDTO selectProductDTO);
    ProductDTO selectProductByProductId(String productId);
    String selectMemberIdByProductId(String productId);
    int updateProduct(ProductUpdateDTO productDTO);
    boolean incrementProductViews(String productId);
    List<ProductListDTO> searchProductListByKeyword(SearchProductDTO searchProductDTO);
    List<String> autocompleteKeyword(String keyword);
    int insertProductKeyword(Map<String, Object> map);
    int deleteProductKeyword(Map<String, Object> map);
    int selectDiscountedProductPriceByProductId(String productId);
}
