package com.everypet.product.service;

import com.everypet.product.model.domain.Product;
import com.everypet.product.model.vo.ProductCreateDTO;
import com.everypet.product.model.vo.ProductUpdateDTO;
import com.everypet.product.model.vo.SelectProductDTO;

import java.util.List;

public interface ProductService {
    void insertProduct(ProductCreateDTO productCreateDTO, String memberId);

    void deleteProduct(String productId, String memberId);

    List<Product> selectProductList(SelectProductDTO selectProductDTO);

    Product selectProductByProductId(String productId);

    void updateProduct(ProductUpdateDTO productUpdateDTO, String memberId);
}
