package com.everypet.product.controller;

import com.everypet.product.model.domain.Advertisement;
import com.everypet.product.model.vo.AdvertisementDTO;
import com.everypet.product.model.vo.InsertAdvertisementDTO;
import com.everypet.product.model.vo.UpdateAdvertisementDTO;
import com.everypet.product.service.AdvertisementService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "광고 Api")
@RestController
@RequiredArgsConstructor
public class AdvertisementController {

    private final AdvertisementService advertisementService;

    @PostMapping("/ad-test")
    public String test(){

        return "test";
    }

    @ApiOperation(value = "광고 추가", notes = "새로운 광고를 추가합니다.")
    @PostMapping("/insert-advertisement")
    public ResponseEntity<String> insertAdvertisement(InsertAdvertisementDTO insertAdvertisementDto){

        HttpStatus httpStatus;
        String result;

        System.out.println(insertAdvertisementDto.getAdvertisementStatusYn());

        try {
            advertisementService.insertAdvertisement(insertAdvertisementDto);
            httpStatus = HttpStatus.OK;
            result = "광고 등록 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    @ApiOperation(value = "광고 수정", notes = "광고를 수정합니다.")
    @PostMapping("/update-advertisement")
    public ResponseEntity<String> updateAdvertisement(UpdateAdvertisementDTO updateAdvertisementDTO){

        HttpStatus httpStatus;
        String result;

        try {
            advertisementService.updateAdvertisement(updateAdvertisementDTO);
            httpStatus = HttpStatus.OK;
            result = "광고 수정 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    @ApiOperation(value = "광고 삭제", notes = "광고를 삭제합니다.")
    @PostMapping("/delete-advertisement")
    public ResponseEntity<String> deleteAdvertisement(String advertisementId){

        HttpStatus httpStatus;
        String result;

        try {
            advertisementService.deleteAdvertisement(advertisementId);
            httpStatus = HttpStatus.OK;
            result = "광고 삭제 완료";
        }catch (RuntimeException e){
            httpStatus = HttpStatus.BAD_REQUEST;
            result = e.getMessage();
        }

        return response(httpStatus,result);
    }

    @ApiOperation(value = "광고 리스트 출력", notes = "광고 리스트를 출력합니다")
    @PostMapping("/advertisement-list")
    public List<AdvertisementDTO> advertisementList(){

        return advertisementService.selectAllAdvertisements();
    }

    @ApiOperation(value = "광고 출력", notes = "광고를 출력합니다")
    @PostMapping("/advertisement")
    public Advertisement advertisement(String advertisementId){

        return advertisementService.selectAdvertisementById(advertisementId);
    }

    private ResponseEntity<String> response(HttpStatus httpStatus,String result) {
        return ResponseEntity.status(httpStatus)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8")
                .body(result);
    }
}
