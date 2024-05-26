package com.everypet.product.controller;

import com.everypet.product.data.domain.Product;
import com.everypet.product.data.dto.ProductCreateDTO;
import com.everypet.product.data.dto.ProductUpdateDTO;
import com.everypet.product.data.dto.SelectProductDTO;
import com.everypet.product.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

        String memberId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            productService.insertProduct(productDTO, memberId);
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
    @PostMapping("/product-list")
    public List<Product> selectProduct(@RequestBody SelectProductDTO selectProductDTO){

        System.out.println(selectProductDTO.getProductCategory());
        System.out.println(selectProductDTO.getOrderBy());
        System.out.println(selectProductDTO.getPage());
        System.out.println(selectProductDTO.getPageSize());

        return productService.selectProductList(selectProductDTO);
    }

    @ApiOperation(value = "상품 출력", notes = "productId 넣기, 상품을 출력합니다.")
    @PostMapping("/product")
    public Product selectProductByProductId(String productId){
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


    private ResponseEntity<String> response(HttpStatus httpStatus,String result) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(result);
    }
}
