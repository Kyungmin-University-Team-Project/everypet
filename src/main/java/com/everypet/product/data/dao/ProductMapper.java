package com.everypet.product.data.dao;

import com.everypet.product.data.domain.Product;
import com.everypet.product.data.dto.ProductInsertDTO;
import com.everypet.product.data.dto.ProductUpdateDTO;
import com.everypet.product.data.dto.SelectProductDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {

    int insertProduct(ProductInsertDTO productInsertDTO);
    int deleteProductByProductId(String productId);
    List<Product> selectProduct(SelectProductDTO selectProductDTO);
    Product selectProductByProductId(String productId);
    String selectMemberIdByProductId(String productId);
    int updateProduct(ProductUpdateDTO productDTO);
    boolean incrementProductViews(String productId);
}
