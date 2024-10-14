package com.everypet.product.controller;

import com.everypet.member.model.vo.Member;
import com.everypet.product.model.dto.*;
import com.everypet.product.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Api(tags = "상품 Api")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @ApiOperation(value = "상품 추가", notes = "새로운 상품을 추가합니다.")
    @PostMapping("/insert")
    public ResponseEntity<String> insertProductInfo(@RequestBody ProductDTO.ProductInsertDTO productDTO) throws UnsupportedEncodingException {
        try {
            productDTO.setProductMainCategory(new String(productDTO.getProductMainCategory().getBytes("8859_1"), "UTF-8"));
            productDTO.setProductSubCategory(new String(productDTO.getProductSubCategory().getBytes("8859_1"), "UTF-8"));
            productDTO.setProductName(new String(productDTO.getProductName().getBytes("8859_1"), "UTF-8"));

            //String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

            productService.insertProduct(productDTO, productDTO.getMemberId());
            return ResponseEntity.ok().body("상품 추가 완료");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @ApiOperation(value = "상품 삭제", notes = "상품의 ID 보내기, 상품을 삭제합니다.")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProduct(@RequestBody String productId){
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

            productService.deleteProduct(productId, memberId);
            return ResponseEntity.ok().body("상품 삭제 완료");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @ApiOperation(value = "카테고리 별 상품 리스트 출력", notes = "카테고리 대분류, 카테고리 소분류, 정렬 기준, 페이지 번호, 페이지 사이즈를 경로로 받아서 상품 리스트를 출력합니다.\n" +
            "대분류 : 강아지, 고양이, 조류\n소분류 : all, 간식, 모래, 사료, 새장, 영양제, 장난감, 화장실\n" +
            "정렬 : popularity(인기순), sales_high(판매량 높은 순), sales_low(판매량 낮은 순), price_high(가격 높은 순), price_low(가격 낮은 순), latest(최신순), oldest(오래된순)")
    @GetMapping("/list/{productMainCategory}/{productSubCategory}/{orderBy}/{page}/{pageSize}")
    public ResponseEntity<List<ProductListDTO>> selectProduct(
            @PathVariable String orderBy,
            @PathVariable int page,
            @PathVariable int pageSize,
            @PathVariable String productMainCategory,
            @PathVariable String productSubCategory){
        try {

            return ResponseEntity.ok().body(productService.selectProductList(productMainCategory, productSubCategory, orderBy, page, pageSize));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @ApiOperation(value = "단일 상품 출력", notes = "productId 넣기, 상품을 출력합니다.")
    @GetMapping("/{productId}")
    public ResponseEntity<ProductListDTO> selectProductByProductId(@PathVariable String productId){
        try {
            return ResponseEntity.ok().body(productService.selectProductByProductId(productId));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @ApiOperation(value = "상품 정보 수정", notes = "상품의 정보를 수정합니다.")
    @PostMapping("/update")
    public ResponseEntity<String> updateProductInfo(@RequestBody ProductDTO.ProductInsertDTO productInsertDTO) throws UnsupportedEncodingException {
        try {
            productInsertDTO.setProductMainCategory(new String(productInsertDTO.getProductMainCategory().getBytes("8859_1"), "UTF-8"));
            productInsertDTO.setProductSubCategory(new String(productInsertDTO.getProductSubCategory().getBytes("8859_1"), "UTF-8"));
            productInsertDTO.setProductName(new String(productInsertDTO.getProductName().getBytes("8859_1"), "UTF-8"));

            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

            productService.updateProduct(productInsertDTO, memberId);
            return ResponseEntity.ok().body("상품 수정 완료");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // --------------------------------------- 키워드 검색 ---------------------------------------------

    @ApiOperation(value = "키워드 상품 검색", notes = "검색창에 키워드를 검색하면 키워드에 해당하는 상품 리스트를 조회합니다 \n" +
            "정렬 : popularity(인기순), sales_high(판매량 높은 순), sales_low(판매량 낮은 순), price_high(가격 높은 순), price_low(가격 낮은 순), latest(최신순), oldest(오래된순)")
    @GetMapping("/search/{keyword}/{orderBy}/{page}/{pageSize}")
    public ResponseEntity<List<ProductListDTO>> searchProducts(
            @ApiIgnore @AuthenticationPrincipal Member member,
            @ApiIgnore HttpServletRequest request,
            @PathVariable String keyword,
            @PathVariable String orderBy,
            @PathVariable int page,
            @PathVariable int pageSize){
        try {
            return ResponseEntity.ok().body(productService.selectProductListByKeyword(keyword, orderBy, page, pageSize, member, request));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @ApiOperation(value = "키워드 자동 검색", notes = "한 글자 단위로 키워드를 자동 검색합니다.")
    @PostMapping("/keyword/autocomplete")
    public ResponseEntity<List<String>> autocompleteKeyword(@RequestBody String keyword){
        try {
            return ResponseEntity.ok().body(productService.autocompleteKeyword(keyword));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @ApiOperation(value = "상품 키워드 추가", notes = "상품에 키워드를 추가합니다")
    @PostMapping("/keyword/insert")
    public ResponseEntity<String> insertKeyword(@RequestBody ProductKeywordDTO insertProductKeywordDTO){
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();
            productService.insertProductKeyword(insertProductKeywordDTO, memberId);
            return ResponseEntity.ok().body("키워드 추가 완료");
        }catch (RuntimeException e){
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @ApiOperation(value = "키워드 삭제", notes = "상품에 키워드를 삭제합니다")
    @DeleteMapping("/keyword/delete")
    public ResponseEntity<String> deleteKeyword(@RequestBody ProductKeywordDTO deleteProductKeywordDTO){
        try {
            String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

            productService.deleteProductKeyword(deleteProductKeywordDTO, memberId);
            return ResponseEntity.ok().body("키워드 삭제 완료");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
