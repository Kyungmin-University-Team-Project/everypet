package com.everypet.product.service;

import com.everypet.product.model.dto.*;

import java.util.List;
import java.util.Set;

public interface ProductService {
    void insertProduct(ProductCreateDTO productCreateDTO, String memberId);

    void deleteProduct(String productId, String memberId);

    List<ProductListDTO> selectProductList(SelectProductDTO selectProductDTO);

    ProductDTO selectProductByProductId(String productId);

    void updateProduct(ProductUpdateDTO productUpdateDTO, String memberId);

    List<ProductListDTO> selectProductListByKeyword(SearchProductDTO searchProductDTO);

    List<String> autocompleteKeyword(String keyword);

    void insertProductKeyword(InsertProductKeywordDTO insertProductKeywordDTO, String memberId);

    void deleteProductKeyword(DeleteProductKeywordDTO deleteProductKeywordDTO, String memberId);

    Set<String> realTimeKeyword(int count);
}
