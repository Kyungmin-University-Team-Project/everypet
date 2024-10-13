package com.everypet.review.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
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

    @Data
    @Builder
    public static class ProductReviewSearchDTO {

        @ApiModelProperty(example = "uuid", notes = "상품의 ID를 넣어주세요")
        private Long productId;  // 상품 ID

        @ApiModelProperty(example = "latest", notes = "정렬 기준을 설정합니다. 예: latest(최신순), oldest(오래된순), most_helpful(도움이 많이 된 순), least_helpful(도움이 적게 된 순)")
        private String sortBy = "latest";  // 정렬 기준 (기본값: 최신순)

        @ApiModelProperty(example = "1", notes = "페이지 번호를 넣어주세요. 1 이상이어야 합니다.")
        @Min(value = 1, message = "페이지 번호는 1 이상이어야 합니다.")
        private int page = 1;  // 페이지 번호 (기본값: 1)

        @ApiModelProperty(example = "10", notes = "페이지당 리뷰 개수를 넣어주세요. 1 이상이어야 합니다.")
        @Min(value = 1, message = "페이지 크기는 1 이상이어야 합니다.")
        private int pageSize = 10;  // 페이지당 리뷰 개수 (기본값: 10)
    }
}
