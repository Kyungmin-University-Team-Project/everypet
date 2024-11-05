package com.everypet.clound.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudBucketService {

    void uploadImageToCloudStorage(String imageId, MultipartFile image);

    void deleteImageFromCloudStorage(String imageId);

    void updateImageFromCloudStorage(String imageId, MultipartFile image);

}
