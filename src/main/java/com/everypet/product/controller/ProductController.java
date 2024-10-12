package com.everypet.product.controller;

import com.everypet.member.model.vo.Member;
import com.everypet.product.model.dto.*;
import com.everypet.product.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Api(tags = "상품 Api")
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @ApiOperation(value = "상품 추가", notes = "새로운 상품을 추가합니다.")
    @PostMapping("/insert-product")
    public ResponseEntity<String> insertProductInfo(ProductCreateDTO productDTO) throws UnsupportedEncodingException {

        productDTO.setProductCategory(new String(productDTO.getProductCategory().getBytes("8859_1"), "UTF-8"));
        productDTO.setProductName(new String(productDTO.getProductName().getBytes("8859_1"), "UTF-8"));

        HttpStatus httpStatus;
        String result;

        //String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            productService.insertProduct(productDTO, productDTO.getMemberId());
            httpStatus = HttpStatus.OK;
            result = "상품 등록 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    @ApiOperation(value = "상품 삭제", notes = "상품의 'URL' 보내기, 상품을 삭제합니다.")
    @PostMapping("/delete-product")
    public ResponseEntity<String> deleteProduct(@RequestBody String productId){

        HttpStatus httpStatus;
        String result;

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            productService.deleteProduct(productId, memberId);
            httpStatus = HttpStatus.OK;
            result = "상품 삭제 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }
        return response(httpStatus,result);
    }

    @ApiOperation(value = "상품 리스트 출력", notes = "orderBy, page, pageSize, productCategory 만 넣기, 상품 리스를을 출력합니다.")
    @GetMapping("/product-list")
    public List<ProductListDTO> selectProduct(@Valid @ModelAttribute SelectProductDTO selectProductDTO){
        return productService.selectProductList(selectProductDTO);
    }

    @ApiOperation(value = "상품 출력", notes = "productId 넣기, 상품을 출력합니다.")
    @GetMapping("/product")
    public ProductDTO selectProductByProductId(String productId){
        return productService.selectProductByProductId(productId);
    }

    @ApiOperation(value = "상품 수정", notes = "상품을 수정합니다.")
    @PostMapping("/update-product")
    public ResponseEntity<String> updateProductInfo(ProductUpdateDTO productUpdateDTO) throws UnsupportedEncodingException {

        productUpdateDTO.setProductCategory(new String(productUpdateDTO.getProductCategory().getBytes("8859_1"), "UTF-8"));
        productUpdateDTO.setProductName(new String(productUpdateDTO.getProductName().getBytes("8859_1"), "UTF-8"));

        HttpStatus httpStatus;
        String result;

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            productService.updateProduct(productUpdateDTO, memberId);
            httpStatus = HttpStatus.OK;
            result = "상품 수정 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    // --------------------------------------- 키워드 검색 ---------------------------------------------

    @ApiOperation(value = "상품 키워드 검색", notes = "검색창에서 키워드를 입력하고, 키워드에 해당하는 상품 정보를 출력합니다.")
    @GetMapping("/search-products")
    public List<ProductListDTO> searchProducts(@Valid @ModelAttribute SearchProductDTO searchProductDTO, @ApiIgnore @AuthenticationPrincipal Member member, @ApiIgnore HttpServletRequest request){

        return productService.selectProductListByKeyword(searchProductDTO, member, request);
    }

    @ApiOperation(value = "키워드 자동 검색", notes = "한 글자 단위로 키워드를 자동 검색합니다.")
    @PostMapping("/autocomplete-keyword")
    public List<String> autocompleteKeyword(@RequestBody String keyword){

        return productService.autocompleteKeyword(keyword);
    }

    @ApiOperation(value = "키워드 추가", notes = "상품에 키워드를 추가합니다")
    @PostMapping("/insert-keyword")
    public ResponseEntity<String> insertKeyword(@RequestBody InsertProductKeywordDTO insertProductKeywordDTO){

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        productService.insertProductKeyword(insertProductKeywordDTO, memberId);

        return response(HttpStatus.OK, "키워드 추가 완료");
    }

    @ApiOperation(value = "키워드 삭제", notes = "상품에 키워드를 삭제합니다")
    @PostMapping("/delete-keyword")
    public ResponseEntity<String> deleteKeyword(@RequestBody DeleteProductKeywordDTO deleteProductKeywordDTO){

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        productService.deleteProductKeyword(deleteProductKeywordDTO, memberId);

        return response(HttpStatus.OK, "키워드 삭제 완료");
    }

    // ----------------------------------------------------------------------------------------------
    private ResponseEntity<String> response(HttpStatus httpStatus,String result) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(result);
    }
}
