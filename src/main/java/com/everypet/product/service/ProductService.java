package com.everypet.product.service;

import com.everypet.member.model.vo.Member;
import com.everypet.product.model.dto.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ProductService {
    void insertProduct(ProductCreateDTO productCreateDTO, String memberId);

    void deleteProduct(String productId, String memberId);

    List<ProductListDTO> selectProductList(SelectProductDTO selectProductDTO);

    ProductDTO selectProductByProductId(String productId);

    void updateProduct(ProductUpdateDTO productUpdateDTO, String memberId);

    List<ProductListDTO> selectProductListByKeyword(SearchProductDTO searchProductDTO, Member member, HttpServletRequest request);

    List<String> autocompleteKeyword(String keyword);

    void insertProductKeyword(InsertProductKeywordDTO insertProductKeywordDTO, String memberId);

    void deleteProductKeyword(DeleteProductKeywordDTO deleteProductKeywordDTO, String memberId);

}
