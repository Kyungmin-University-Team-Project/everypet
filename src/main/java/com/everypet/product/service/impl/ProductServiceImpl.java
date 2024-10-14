package com.everypet.product.service.impl;

import com.everypet.global.util.GoogleImageCloudService;
import com.everypet.global.util.IpUtil;
import com.everypet.keyword.service.KeywordLogService;
import com.everypet.keyword.service.KeywordRankService;
import com.everypet.member.model.vo.Member;
import com.everypet.product.model.dao.ProductMapper;
import com.everypet.product.model.dto.ProductDTO;
import com.everypet.product.model.dto.ProductKeywordDTO;
import com.everypet.product.model.dto.ProductListDTO;
import com.everypet.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final GoogleImageCloudService imageCloudService;
    private final ProductMapper productMapper;

    private final KeywordRankService keywordRankService;
    private final KeywordLogService keywordLogService;

    @Override
    public void insertProduct(ProductDTO.ProductInsertDTO productInsertDTO, String memberId){

        // 이미지 업로드 관련 부분
        String productId = UUID.randomUUID().toString(); // UUID 생성

        imageCloudService.uploadImageToCloudStorage(productId, productInsertDTO.getProductImage()); // 대표 이미지 업로드
        imageCloudService.uploadImageToCloudStorage(productId + "-description", productInsertDTO.getProductDescriptionImage()); // 설명 이미지 업로드

        Map<String, Object> productInsertMap = new HashMap<>();
        productInsertMap.put("productId", productId);
        productInsertMap.put("memberId", memberId);
        productInsertMap.put("productName", productInsertDTO.getProductName());
        productInsertMap.put("productImg",  imageCloudService.getGOOGLE_IMAGE_CLOUD_URL()+ productId);
        productInsertMap.put("productDescriptionImg", imageCloudService.getGOOGLE_IMAGE_CLOUD_URL() + productId + "-description");
        productInsertMap.put("productPrice", productInsertDTO.getProductPrice());
        productInsertMap.put("productDiscountRate", productInsertDTO.getProductDiscountRate());
        productInsertMap.put("numberOfProduct", productInsertDTO.getNumberOfProduct());
        productInsertMap.put("productSalesStatusYN", productInsertDTO.getProductSalesStatusYN());
        productInsertMap.put("productMainCategory", productInsertDTO.getProductMainCategory());
        productInsertMap.put("productSubCategory", productInsertDTO.getProductSubCategory());


        // DB에 저장하는 로직
        int result = productMapper.insertProduct(productInsertMap);

        if (result == 0) {
            throw new RuntimeException("DB에 상품 등록 실패");
        }
    }

    @Override
    public void deleteProduct(String productId, String memberId) {

        // memberId와 productId를 이용하여 상품 삭제 권한 확인
        validateProductDeletionPermission(productId, memberId);

        // Cloud Storage에서 이미지 삭제
        imageCloudService.deleteImageFromCloudStorage(productId);
        imageCloudService.deleteImageFromCloudStorage(productId + "-description");

        // DB에서 상품 삭제
        int result = productMapper.deleteProductByProductId(productId);

        if (result == 0) {
            throw new RuntimeException("DB에 상품 삭제 실패");
        }
    }

    @Override
    public List<ProductListDTO> selectProductList(String productMainCategory, String  productSubCategory, String  orderBy, int page, int pageSize) {

        System.out.println("productMainCategory = " + productMainCategory);
        System.out.println("productSubCategory = " + productSubCategory);

        // 페이지 번호와 페이지 크기를 이용하여 페이지의 시작 인덱스를 계산
        int pageStart = (page - 1) * pageSize;

        // 서브 카테고리가 'all'일 경우 '%'로 변경
        if ("all".equals(productSubCategory)) {
            productSubCategory = "%";  // LIKE '%' 처리
        }

        System.out.println("productSubCategory = " + productSubCategory);

        Map<String, Object> params = new HashMap<>();
        params.put("productMainCategory", productMainCategory);
        params.put("productSubCategory", productSubCategory);
        params.put("orderBy", convertOrderByKeywordToQuery(orderBy));
        params.put("pageStart", pageStart);
        params.put("pageSize", pageSize);

        return productMapper.selectProductList(params);
    }

    @Override
    public ProductListDTO selectProductByProductId(String productId) {

        if (!productMapper.incrementProductViews(productId)) {
            throw new RuntimeException("상품 조회수 증가 실패");
        }

        return productMapper.selectProductByProductId(productId);
    }

    @Override
    public void updateProduct(ProductDTO.ProductInsertDTO productUpdateDTO, String memberId) {

        // 수정 권한을 확인하는 메서드
        validateProductDeletionPermission(productUpdateDTO.getProductId(), memberId);

        // 대표 이미지 및 설명 이미지가 있을 경우 업로드 처리
        if (productUpdateDTO.getProductImage() != null || productUpdateDTO.getProductDescriptionImage() != null) {
            imageCloudService.updateImageFromCloudStorage(productUpdateDTO.getProductId(), productUpdateDTO.getProductImage()); // 대표 이미지 업로드
            imageCloudService.updateImageFromCloudStorage(productUpdateDTO.getProductId() + "-description", productUpdateDTO.getProductDescriptionImage()); // 설명 이미지 업로드
        }

        Map<String, Object> productUpdateMap = new HashMap<>();
        productUpdateMap.put("productId", productUpdateDTO.getProductId());
        productUpdateMap.put("productName", productUpdateDTO.getProductName());
        productUpdateMap.put("productPrice", productUpdateDTO.getProductPrice());
        productUpdateMap.put("productChangedDate", LocalDateTime.now(ZoneId.of("Asia/Seoul"))); // 수정 시간 현재 시간으로 설정
        productUpdateMap.put("productSalesStatusYN", productUpdateDTO.getProductSalesStatusYN());
        productUpdateMap.put("productDiscountRate", productUpdateDTO.getProductDiscountRate());
        productUpdateMap.put("numberOfProduct", productUpdateDTO.getNumberOfProduct());
        productUpdateMap.put("productMainCategory", productUpdateDTO.getProductMainCategory());
        productUpdateMap.put("productSubCategory", productUpdateDTO.getProductSubCategory());

        // DB에 저장하는 로직
        int result = productMapper.updateProduct(productUpdateMap);

        if (result == 0) {
            throw new RuntimeException("DB에 상품 수정 실패");
        }
    }


    @Override
    public List<ProductListDTO> selectProductListByKeyword(String keyword, String orderBy, int page, int pageSize, Member member, HttpServletRequest request) {

        // 페이지 번호와 페이지 크기를 이용하여 페이지의 시작 인덱스를 계산
        int pageStart = (page - 1) * pageSize;

        Map<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);
        params.put("orderBy", convertOrderByKeywordToQuery(orderBy));
        params.put("pageStart", pageStart);
        params.put("pageSize", pageSize);

        // ip 주소 가져오기
        String ip = IpUtil.getClientIpAddress(request);
        // 검색 기록을 저장
        keywordRankService.keywordRedisSave(ip, keyword);

        // 검색 기록을 DB에 저장
        keywordLogService.saveKeywordLog(keyword, member);

        return productMapper.searchProductListByKeyword(params);
    }

    @Override
    public List<String> autocompleteKeyword(String keyword) {

        return productMapper.autocompleteKeyword(keyword);
    }

    @Override
    public void insertProductKeyword(ProductKeywordDTO insertProductKeywordDTO, String memberId) {

        validateProductDeletionPermission(insertProductKeywordDTO.getProductId(), memberId);

        Map<String, Object> params = new HashMap<>();
        params.put("productId", insertProductKeywordDTO.getProductId());
        params.put("keyword", insertProductKeywordDTO.getKeyword());

        int result = productMapper.insertProductKeyword(params);

        if (result == 0) {
            throw new RuntimeException("DB에 키워드 추가 실패");
        }
    }

    @Override
    public void deleteProductKeyword(ProductKeywordDTO deleteProductKeywordDTO, String memberId) {

        validateProductDeletionPermission(deleteProductKeywordDTO.getProductId(), memberId);

        Map<String, Object> params = new HashMap<>();
        params.put("productId", deleteProductKeywordDTO.getProductId());
        params.put("keywordId", deleteProductKeywordDTO.getKeyword());

        int result = productMapper.deleteProductKeyword(params);

        if (result == 0) {
            throw new RuntimeException("DB에 키워드 삭제 실패");
        }
    }

    // 상품 권한 확인
    public void validateProductDeletionPermission(String productId, String memberId) {
        String selectMemberId = productMapper.selectMemberIdByProductId(productId);
        if (!memberId.equals(selectMemberId)) {
            throw new RuntimeException("상품에 대한 권한이 없습니다");
        }
    }

    // orderBy 키워드를 실제 쿼리로 변환하는 메서드
    private String convertOrderByKeywordToQuery(String orderBy) {
        switch (orderBy) {
            case "sales_high":
                return "SALES_COUNT DESC";  // 판매량 높은 순
            case "sales_low":
                return "SALES_COUNT ASC";   // 판매량 낮은 순
            case "price_high":
                return "PRODUCT_PRICE DESC"; // 가격 높은 순
            case "price_low":
                return "PRODUCT_PRICE ASC";  // 가격 낮은 순
            case "latest":
                return "PRODUCT_REGISTRATION_DATE DESC"; // 최신 출시일 순
            case "oldest":
                return "PRODUCT_REGISTRATION_DATE ASC";  // 오래된 출시일 순
            case "popularity":
                // 인기순: 판매량(50%) + 평점(30%) + 리뷰 수(20%)
                return "(0.5 * salesCount + 0.3 * productRatingAvg + 0.2 * reviewCount) DESC";
            default:
                throw new IllegalArgumentException("잘못된 정렬 기준입니다.");
        }
    }


}
