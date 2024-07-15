package com.everypet.product.service;

import com.everypet.product.model.vo.Product;
import com.everypet.product.model.dto.ProductCreateDTO;
import com.everypet.product.model.dto.ProductUpdateDTO;
import com.everypet.product.model.dto.SelectProductDTO;

import java.util.List;

public interface ProductService {
    void insertProduct(ProductCreateDTO productCreateDTO, String memberId);

    void deleteProduct(String productId, String memberId);

    List<Product> selectProductList(SelectProductDTO selectProductDTO);

    Product selectProductByProductId(String productId);

    void updateProduct(ProductUpdateDTO productUpdateDTO, String memberId);
}
