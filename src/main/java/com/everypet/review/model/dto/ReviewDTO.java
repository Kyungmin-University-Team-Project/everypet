package com.everypet.review.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ReviewDTO {



    @Data
    @Builder
    public static class InsertProductReviewDTO {

        @NotBlank
        @ApiModelProperty(example = "orderDetailId", notes = "orderDetailId를 넣어주세요")
        private Long orderDetailId; // 주문 상세 ID

        @NotBlank
        @ApiModelProperty(example = "productId", notes = "리뷰한 상품의 아이디를 넣어주세요")
        private String productId; // 상품 아이디

        @NotBlank
        @ApiModelProperty(example = "이 제품은 최고에요!", notes = "리뷰한 상품의 한줄 리뷰를 넣어주세요")
        private String OneLineProductReviewContents; // 상품 한줄 리뷰

        @NotBlank
        @ApiModelProperty(example = "이 제품은 어쩌구 저쩌구...", notes = "리뷰한 상품의 상세 리뷰를 넣어주세요")
        private String DetailedProductReviewContents; // 상품 상세 리뷰

        @NotBlank
        @ApiModelProperty(example = "5", notes = "리뷰한 상품의 평점, 1~5 사이의 숫자를 넣어주세요")
        private String ProductRating; // 상품 평점

        @NotBlank
        @ApiModelProperty(example = "상품의 리뷰 이미지 삽입", notes = "리뷰한 상품의 이미지를 List로 넣어주세요, 10개 이하로 넣어주세요")
        private List<MultipartFile> productReviewImages; // 리뷰한 상품의 이미지 파일
    }

    @Data
    @Builder
    public static class ProductReviewDTO {
        private Long reviewId;
        private String memberId;
        private Long productId;
        private String detailedProductReviewContents;
        private String oneLineProductReviewContents;
        private int productRating;
        private LocalDateTime createdAt;
        // 새로운 필드: 도움이 된 수와 도움이 안된 수
        private int helpfulCount;
        private int notHelpfulCount;
        // 리뷰 사진
        private List<String> reviewPhotosURL;
    }
}
