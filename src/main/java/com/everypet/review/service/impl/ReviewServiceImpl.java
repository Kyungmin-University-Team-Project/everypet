package com.everypet.review.service.impl;

import com.everypet.clound.service.impl.GoogleBucketCloudService;
import com.everypet.order.model.dao.OrderDetailMapper;
import com.everypet.review.model.dao.ReviewHelpfulMapper;
import com.everypet.review.model.dao.ReviewMapper;
import com.everypet.review.model.dao.ReviewPhotoMapper;
import com.everypet.review.model.dto.ReviewDTO;
import com.everypet.review.model.dto.ReviewHelpfulDTO;
import com.everypet.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewMapper reviewMapper;
    private final ReviewPhotoMapper reviewPhotoMapper;
    private final GoogleBucketCloudService googleBucketCloudService;
    private final OrderDetailMapper orderDetailMapper;
    private final ReviewHelpfulMapper reviewHelpfulMapper;
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void insertProductReview(String memberId, ReviewDTO.InsertProductReviewDTO dto) {
        try {
            // 이미지 개수 제한
            if (dto.getProductReviewImages().size() > 10) {
                throw new RuntimeException("이미지 개수는 10개 이하로만 가능합니다.");
            }

            // 1. 리뷰 정보 삽입
            Map<String, Object> reviewMap = new HashMap<>();
            reviewMap.put("orderDetailId", dto.getOrderDetailId());
            reviewMap.put("memberId", memberId);
            reviewMap.put("productId", dto.getProductId());
            reviewMap.put("detailedProductReviewContents", dto.getDetailedProductReviewContents());
            reviewMap.put("oneLineProductReviewContents", dto.getOneLineProductReviewContents());
            reviewMap.put("productRating", Integer.parseInt(dto.getProductRating()));

            // 리뷰 삽입 후 reviewId 생성
            reviewMapper.insertReview(reviewMap);
            Long reviewId = (Long) reviewMap.get("reviewId"); // 삽입된 reviewId 가져오기

            // 2. 리뷰 이미지 삽입
            if (dto.getProductReviewImages() != null && !dto.getProductReviewImages().isEmpty()) {
                int imageNumber = 0;

                for (MultipartFile file : dto.getProductReviewImages()) {
                    imageNumber++;
                    String imageId = reviewId + "-" + imageNumber; // UUID 생성

                    // 클라우드에 이미지 업로드
                    googleBucketCloudService.uploadImageToCloudStorage(imageId, file);

                    // 리뷰 이미지 삽입
                    Map<String, Object> reviewPhotoMap = new HashMap<>();
                    reviewPhotoMap.put("reviewId", reviewId); // 삽입된 리뷰 ID
                    reviewPhotoMap.put("photoUrl", googleBucketCloudService.getGOOGLE_IMAGE_CLOUD_URL() + imageId);

                    reviewPhotoMapper.insertReviewPhoto(reviewPhotoMap); // 리뷰 사진 삽입
                }
            }

            // 3. 주문 상세 리뷰 상태 Y로 변경
            orderDetailMapper.updateReviewStatusToY(dto.getOrderDetailId());
        }catch (Exception e){
            throw new RuntimeException("리뷰 등록 실패: " + e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteProductReview(Long reviewId) {
        // 리뷰 사진 조회
        List<String> reviewPhotosURL = reviewPhotoMapper.selectReviewPhotosByReviewId(reviewId);

        // 리뷰 이미지 삭제 (클라우드에서 삭제)
        for (String photoUrl : reviewPhotosURL) {
            String photoId = photoUrl.replace(googleBucketCloudService.getGOOGLE_IMAGE_CLOUD_URL(), "");
            googleBucketCloudService.deleteImageFromCloudStorage(photoId);
        }

        // 리뷰 이미지 삭제 (DB에서 삭제)
        reviewPhotoMapper.deleteReviewPhotosByReviewId(reviewId);

        // 리뷰 삭제 (DB에서 삭제)
        reviewMapper.deleteReviewById(reviewId);

        // 리뷰 상태를 'N'으로 변경 (TBL_ORDER_DETAIL)
        orderDetailMapper.updateReviewStatusToN(reviewId);
    }

    @Override
    public List<ReviewDTO.ProductReviewDTO> getReviewsByProductIdWithHelpful(String productId, String orderBy, int page, int pageSize) {
        int pageStart = (page - 1) * pageSize;

        Map<String, Object> params = new HashMap<>();
        params.put("productId", productId);
        params.put("orderBy", getOrderByClause(orderBy));
        params.put("pageStart", pageStart);
        params.put("pageSize", pageSize);

        List<ReviewDTO.ProductReviewDTO> reviews = reviewMapper.selectReviewsByProductId(params);
        reviews.forEach(review -> {
            review.setReviewPhotosURL(reviewPhotoMapper.selectReviewPhotosByReviewId(review.getReviewId()));
        });
        return reviews;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void markReviewHelpful( String memberId, ReviewHelpfulDTO reviewHelpfulDTO) {
        Map<String, Object> params = new HashMap<>();
        params.put("reviewId", reviewHelpfulDTO.getReviewId());
        params.put("memberId", memberId);
        params.put("isHelpfulYn", reviewHelpfulDTO.getIsHelpfulYn());

        // 리뷰에 대해 이미 도움이 됐는지 여부 확인
        int count = reviewHelpfulMapper.checkIfAlreadyHelpful(params);
        if (count > 0) {
            // 이미 표시한 적이 있다면 업데이트
            reviewHelpfulMapper.updateHelpfulReview(params);
        } else {
            // 처음 표시하는 경우 삽입
            reviewHelpfulMapper.insertHelpfulReview(params);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void cancelHelpfulReview(String memberId, Long reviewId) {
        Map<String, Object> params = new HashMap<>();
        params.put("reviewId", reviewId);
        params.put("memberId", memberId);

        // 도움이 됐다는 표시를 취소 (DB에서 삭제)
        reviewHelpfulMapper.deleteHelpfulReview(params);
    }

    @Override
    public ReviewDTO.ProductReviewDTO getReviewByReviewId(Long reviewId) {
        ReviewDTO.ProductReviewDTO review = reviewMapper.selectReviewByReviewId(reviewId);
        review.setReviewPhotosURL(reviewPhotoMapper.selectReviewPhotosByReviewId(reviewId));
        return review;
    }

    private String getOrderByClause(String orderBy) {
        switch (orderBy) {
            case "latest":
                return "r.CREATED_AT DESC";
            case "oldest":
                return "r.CREATED_AT ASC";
            case "most_helpful":
                return "totalHelpfulCount DESC, r.CREATED_AT DESC";
            case "least_helpful":
                return "totalHelpfulCount ASC, r.CREATED_AT DESC";
            default:
                return "r.CREATED_AT DESC"; // 기본 정렬: 최신순
        }
    }


}
