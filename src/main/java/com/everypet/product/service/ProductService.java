package com.everypet.product.service;

import com.everypet.member.model.vo.Member;
import com.everypet.product.model.dto.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ProductService {

    // 새로운 상품 정보 추가
    void insertProduct(ProductDTO.ProductInsertDTO productInsertDTO, String memberId);

    // 상품 삭제
    void deleteProduct(String productId, String memberId);

    // 상품 리스트 조회
    List<ProductListDTO> selectProductList(String productMainCategory, String  productSubCategory, String  orderBy, int page, int pageSize);

    // 단일 상품 상세 조회
    ProductListDTO selectProductByProductId(String productId);

    void updateProduct(ProductDTO.ProductInsertDTO productUpdateDTO, String memberId);

    List<ProductListDTO> selectProductListByKeyword(String keyword, String orderBy, int page, int pageSize, Member member, HttpServletRequest request);

    List<String> autocompleteKeyword(String keyword);

    void insertProductKeyword(ProductKeywordDTO insertProductKeywordDTO, String memberId);

    void deleteProductKeyword(ProductKeywordDTO deleteProductKeywordDTO, String memberId);

}
