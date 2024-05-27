package com.everypet.product.service;

import com.everypet.product.data.domain.Product;
import com.everypet.product.data.dto.ProductCreateDTO;
import com.everypet.product.data.dto.ProductUpdateDTO;
import com.everypet.product.data.dto.SelectProductDTO;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    void insertProduct(ProductCreateDTO productCreateDTO, String memberId);

    void deleteProduct(String productId, String memberId);

    List<Product> selectProductList(SelectProductDTO selectProductDTO);

    Product selectProductByProductId(String productId);

    void updateProduct(ProductUpdateDTO productUpdateDTO, String memberId);
}
