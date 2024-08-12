package com.everypet.member.controller;

import com.everypet.member.model.dto.AddressDTO;
import com.everypet.member.model.vo.Member;
import com.everypet.member.service.AddressService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "주소 Api")
@RestController
@RequiredArgsConstructor
public class AddressApiController {

    private final AddressService addressService;

    @ApiOperation(value = "주소 추가", notes = "회원의 주소를 추가합니다.")
    @PostMapping("/address/register")
    public ResponseEntity<String> addressRegister(@RequestBody AddressDTO address, @ApiIgnore @AuthenticationPrincipal Member member) {
        addressService.addressRegister(address, member.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED).body("주소 추가 완료");
    }
}
