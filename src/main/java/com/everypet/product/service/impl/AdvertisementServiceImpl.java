package com.everypet.product.service.impl;

import com.everypet.product.model.dao.AdvertisementMapper;
import com.everypet.product.model.dao.ProductMapper;
import com.everypet.product.model.domain.Advertisement;
import com.everypet.product.model.vo.AdvertisementDTO;
import com.everypet.product.model.vo.InsertAdvertisementDTO;
import com.everypet.product.model.vo.UpdateAdvertisementDTO;
import com.everypet.product.service.AdvertisementService;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdvertisementServiceImpl implements AdvertisementService {

    @Value("${spring.cloud.gcp.bucket}") // application.yml에 써둔 bucket 이름
    private String bucketName;
    private final Storage storage;
    private final ProductMapper productMapper;
    private final AdvertisementMapper advertisementMapper;

    @Override
    public void insertAdvertisement( InsertAdvertisementDTO insertAdvertisementDto) {

        incrementSequence(insertAdvertisementDto.getAdvertisementSequence()); // 기존 광고 순서 업데이트

        // 이미지 업로드
        String advertisementId = UUID.randomUUID().toString(); // UUID 생성
        uploadImageToCloudStorage(advertisementId, insertAdvertisementDto.getAdvertisementImage());

        Advertisement advertisement = Advertisement.builder()
                .advertisementId(advertisementId)
                .memberId(insertAdvertisementDto.getMemberId())
                .advertisementStartDate(insertAdvertisementDto.getAdvertisementStartDate())
                .advertisementEndDate(insertAdvertisementDto.getAdvertisementEndDate())
                .advertisementStatusYn(insertAdvertisementDto.getAdvertisementStatusYn())
                .advertisementSequence(insertAdvertisementDto.getAdvertisementSequence())
                .build();

        advertisementMapper.insertAdvertisement(advertisement);
    }

    @Override
    public List<AdvertisementDTO> selectAllAdvertisements() {
        return advertisementMapper.selectAllAdvertisements();
    }

    @Override
    public void deleteAdvertisement(String advertisementId) {
        // 이미지 삭제
        deleteImageFromCloudStorage(advertisementId);

        int result = advertisementMapper.deleteAdvertisement(advertisementId);
        if (result == 0) {
            throw new RuntimeException("광고 삭제 실패");
        }
    }

    @Override
    public void updateAdvertisement(UpdateAdvertisementDTO updateAdvertisementDTO) {

        incrementSequence(updateAdvertisementDTO.getAdvertisementSequence()); // 기존 광고 순서 업데이트

        // 이미지 수정
        updateImageFromCloudStorage(updateAdvertisementDTO.getAdvertisementId(), updateAdvertisementDTO.getAdvertisementImage());

        Advertisement advertisement = Advertisement.builder()
                .advertisementId(updateAdvertisementDTO.getAdvertisementId())
                .memberId(updateAdvertisementDTO.getMemberId())
                .advertisementStartDate(updateAdvertisementDTO.getAdvertisementStartDate())
                .advertisementEndDate(updateAdvertisementDTO.getAdvertisementEndDate())
                .advertisementStatusYn(updateAdvertisementDTO.getAdvertisementStatusYn())
                .advertisementSequence(updateAdvertisementDTO.getAdvertisementSequence())
                .build();

        int result = advertisementMapper.updateAdvertisement(advertisement);
        if (result == 0) {
            throw new RuntimeException("광고 수정 실패");
        }
    }

    @Override
    public Advertisement selectAdvertisementById(String advertisementId) {
        return advertisementMapper.selectAdvertisementById(advertisementId).orElse(null);
    }

    // 기존 광고의 순서를 업데이트하는 메소드
    private void incrementSequence(int advertisementSequence) {
        advertisementMapper.incrementOrder(advertisementSequence);
    }

    // 이미지 업로드
    private void uploadImageToCloudStorage(String advertisementId, MultipartFile image) {
        try {
            // Cloud에 이미지 업로드
            BlobInfo blobInfo = storage.create(
                    BlobInfo.newBuilder(bucketName, advertisementId) // 저장할 이미지 이름
                            .setContentType(image.getContentType()) // 이미지 확장자
                            .build(),
                    image.getInputStream()
            );
        }catch (IOException e) {
            throw new RuntimeException("클라우드에 이미지 업로드 실패");
        }
    }

    // 이미지 삭제
    private void deleteImageFromCloudStorage(String advertisementId) {
        try {
            BlobId blobId = BlobId.of(bucketName, advertisementId);
            boolean result = storage.delete(blobId);
            if (!result) {
                throw new RuntimeException("클라우드에 저장된 이미지 삭제 실패");
            }
        } catch (StorageException e) {
            throw new RuntimeException("클라우드에 저장된 이미지 삭제 실패");
        }
    }

    // 이미지 수정
    private void updateImageFromCloudStorage(String advertisementId, MultipartFile image) {
        deleteImageFromCloudStorage(advertisementId);
        uploadImageToCloudStorage(advertisementId, image);
    }
}
