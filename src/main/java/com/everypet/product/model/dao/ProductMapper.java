package com.everypet.product.model.dao;

import com.everypet.product.model.vo.Product;
import com.everypet.product.model.dto.ProductInsertDTO;
import com.everypet.product.model.dto.ProductUpdateDTO;
import com.everypet.product.model.dto.SelectProductDTO;
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
