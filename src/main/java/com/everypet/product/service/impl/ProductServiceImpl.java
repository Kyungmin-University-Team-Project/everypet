package com.everypet.product.service.impl;

import com.everypet.product.model.dao.ProductMapper;
import com.everypet.product.model.dto.*;
import com.everypet.product.service.ProductService;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    @Value("${spring.cloud.gcp.bucket}") // application.yml에 써둔 bucket 이름
    private String bucketName;
    private final Storage storage;
    private final ProductMapper productMapper;

    private final StringRedisTemplate redisTemplate;

    @Override
    public void insertProduct(ProductCreateDTO productCreateDTO, String memberId){

        // 이미지 업로드 관련 부분
        String productId = UUID.randomUUID().toString(); // UUID 생성

        uploadImageToCloudStorage(productId, productCreateDTO.getProductImage()); // 대표 이미지 업로드
        uploadImageToCloudStorage(productId + "-description", productCreateDTO.getProductDescriptionImage()); // 설명 이미지 업로드

        Map<String, Object> productInsertMap = new HashMap<>();
        productInsertMap.put("productId", productId);
        productInsertMap.put("memberId", memberId);
        productInsertMap.put("productName", productCreateDTO.getProductName());
        productInsertMap.put("productImg", "https://storage.googleapis.com/every_pet_img/" + productId);
        productInsertMap.put("productDescriptionImg", "https://storage.googleapis.com/every_pet_img/" + productId + "-description");
        productInsertMap.put("productPrice", productCreateDTO.getProductPrice());
        productInsertMap.put("productDiscountRate", productCreateDTO.getProductDiscountRate());
        productInsertMap.put("numberOfProduct", productCreateDTO.getNumberOfProduct());
        productInsertMap.put("productSalesStatusYN", productCreateDTO.getProductSalesStatusYN());
        productInsertMap.put("productCategory", productCreateDTO.getProductCategory());


        // DB에 저장하는 로직
        int result = productMapper.insertProduct(productInsertMap);

        if (result == 0) {
            throw new RuntimeException("DB에 상품 등록 실패");
        }
    }

    @Override
    public void deleteProduct(String productId, String memberId) {

        validateProductDeletionPermission(productId, memberId);

        // Cloud Storage에서 이미지 삭제
        deleteImageFromCloudStorage(productId);
        deleteImageFromCloudStorage(productId + "-description");

        // DB에서 상품 삭제
        int result = productMapper.deleteProductByProductId(productId);

        if (result == 0) {
            throw new RuntimeException("DB에 상품 삭제 실패");
        }

    }

    @Override
    public List<ProductListDTO> selectProductList(SelectProductDTO selectProductDTO) {

        // 페이지 번호와 페이지 크기를 이용하여 페이지의 시작 인덱스를 계산
        int pageStart = (selectProductDTO.getPage() - 1) * selectProductDTO.getPageSize();
        selectProductDTO.setPageStart(pageStart);

        return productMapper.selectProduct(selectProductDTO);
    }

    @Override
    public ProductDTO selectProductByProductId(String productId) {

        if (!productMapper.incrementProductViews(productId)) {
            throw new RuntimeException("상품 조회수 증가 실패");
        }

        return productMapper.selectProductByProductId(productId);
    }

    @Override
    public void updateProduct(ProductUpdateDTO productUpdateDTO, String memberId) {

        validateProductDeletionPermission(productUpdateDTO.getProductId(), memberId);

        if (productUpdateDTO.getProductImage() != null || productUpdateDTO.getProductDescriptionImage() != null){
            updateImageFromCloudStorage(productUpdateDTO.getProductId(), productUpdateDTO.getProductImage()); // 대표 이미지 업로드
            updateImageFromCloudStorage(productUpdateDTO.getProductId() + "-description", productUpdateDTO.getProductDescriptionImage()); // 설명 이미지 업로드
        }


        ProductUpdateDTO productInsertDTO = ProductUpdateDTO.builder()
                .productId(productUpdateDTO.getProductId())
                .productName(productUpdateDTO.getProductName())
                .productPrice(productUpdateDTO.getProductPrice())
                .productDiscountRate(productUpdateDTO.getProductDiscountRate())
                .numberOfProduct(productUpdateDTO.getNumberOfProduct())
                .productSalesStatusYN(productUpdateDTO.getProductSalesStatusYN())
                .productCategory(productUpdateDTO.getProductCategory())
                .productChangedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();

        // DB에 저장하는 로직
        int result = productMapper.updateProduct(productInsertDTO);

        if (result == 0) {
            throw new RuntimeException("DB에 상품 수정 실패");
        }

    }

    @Override
    public List<ProductListDTO> selectProductListByKeyword(SearchProductDTO searchProductDTO) {

        // 페이지 번호와 페이지 크기를 이용하여 페이지의 시작 인덱스를 계산
        int pageStart = (searchProductDTO.getPage() - 1) * searchProductDTO.getPageSize();
        searchProductDTO.setPageStart(pageStart);

        // 검색 키워드를 Redis에 저장 (인기 검색어) - 24시간 유지
        redisTemplate.opsForZSet().incrementScore("search:keyword:", searchProductDTO.getKeyword(), 1);
        redisTemplate.expire("search:keyword:", 60 * 60 * 24, TimeUnit.SECONDS);

        return productMapper.searchProductListByKeyword(searchProductDTO);
    }

    @Override
    public List<String> autocompleteKeyword(String keyword) {

        return productMapper.autocompleteKeyword(keyword);
    }

    @Override
    public void insertProductKeyword(InsertProductKeywordDTO insertProductKeywordDTO, String memberId) {

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
    public void deleteProductKeyword(DeleteProductKeywordDTO deleteProductKeywordDTO, String memberId) {

        validateProductDeletionPermission(deleteProductKeywordDTO.getProductId(), memberId);

        Map<String, Object> params = new HashMap<>();
        params.put("productId", deleteProductKeywordDTO.getProductId());
        params.put("keywordId", deleteProductKeywordDTO.getKeywordId());

        int result = productMapper.deleteProductKeyword(params);

        if (result == 0) {
            throw new RuntimeException("DB에 키워드 삭제 실패");
        }
    }

    @Override
    public Set<String> realTimeKeyword(int count) {
        return redisTemplate.opsForZSet().reverseRange("search:keyword:", 0, count - 1);
    }

    // 이미지 업로드
    private void uploadImageToCloudStorage(String productId, MultipartFile image) {
        try {
            // Cloud에 이미지 업로드
            BlobInfo blobInfo = storage.create(
                    BlobInfo.newBuilder(bucketName, productId) // 저장할 이미지 이름
                            .setContentType(image.getContentType()) // 이미지 확장자
                            .build(),
                    image.getInputStream()
            );
        }catch (IOException e) {
            throw new RuntimeException("클라우드에 이미지 업로드 실패");
        }
    }

    // 이미지 삭제
    private void deleteImageFromCloudStorage(String productId) {
        try {
            BlobId blobId = BlobId.of(bucketName, productId);
            boolean result = storage.delete(blobId);
            if (!result) {
                throw new RuntimeException("클라우드에 저장된 이미지 삭제 실패");
            }
        } catch (StorageException e) {
            throw new RuntimeException("클라우드에 저장된 이미지 삭제 실패");
        }
    }

    // 이미지 수정
    private void updateImageFromCloudStorage(String productId, MultipartFile image) {
        deleteImageFromCloudStorage(productId);
        uploadImageToCloudStorage(productId, image);
    }

    // 상품 권한 확인
    public void validateProductDeletionPermission(String productId, String memberId) {
        String selectMemberId = productMapper.selectMemberIdByProductId(productId);
        if (!memberId.equals(selectMemberId)) {
            throw new RuntimeException("상품에 대한 권한이 없습니다");
        }
    }
}
