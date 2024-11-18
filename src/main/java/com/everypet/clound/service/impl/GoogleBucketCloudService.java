package com.everypet.clound.service.impl;

import com.everypet.clound.service.CloudBucketService;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class GoogleBucketCloudService implements CloudBucketService {

    @Value("${spring.cloud.gcp.bucket}")
    private String bucketName;

    private final Storage storage;

    @Getter
    private final String GOOGLE_IMAGE_CLOUD_URL = "https://storage.googleapis.com/every_pet_img/";

    // 이미지 업로드
    public void uploadImageToCloudStorage(String imageId, MultipartFile image) {
        try {
            BlobInfo blobInfo = storage.create(
                    BlobInfo.newBuilder(bucketName, imageId)
                            .setContentType(image.getContentType())
                            .build(),
                    image.getInputStream()
            );
        } catch (IOException e) {
            throw new RuntimeException("클라우드에 이미지 업로드 실패", e);
        }
    }

    // 이미지 삭제
    public void deleteImageFromCloudStorage(String imageId) {
        try {
            BlobId blobId = BlobId.of(bucketName, imageId);
            boolean result = storage.delete(blobId);
            if (!result) {
                throw new RuntimeException("클라우드에서 이미지 삭제 실패");
            }
        } catch (StorageException e) {
            throw new RuntimeException("클라우드에서 이미지 삭제 실패", e);
        }
    }

    // 이미지 업데이트
    public void updateImageFromCloudStorage(String imageId, MultipartFile image) {
        deleteImageFromCloudStorage(imageId);
        uploadImageToCloudStorage(imageId, image);
    }
}
