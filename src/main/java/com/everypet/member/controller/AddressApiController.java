package com.everypet.member.controller;

import com.everypet.member.model.dto.address.AddressRegisterDTO;
import com.everypet.member.model.dto.address.AddressUpdateDTO;
import com.everypet.member.model.vo.Address;
import com.everypet.member.model.vo.Member;
import com.everypet.member.service.AddressService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(tags = "주소 Api")
@RequestMapping("/address")
@RestController
@RequiredArgsConstructor
public class AddressApiController {

    private final AddressService addressService;
    
    @ApiOperation(value = "주소 조회", notes = "회원의 주소를 조회합니다.")
    @PostMapping("/list")
    public ResponseEntity<List<Address>> addressList(@ApiIgnore @AuthenticationPrincipal Member member) {
        List<Address> address = addressService.getAddressByMemberId(member.getMemberId());
        return ResponseEntity.ok(address);
    }

    @ApiOperation(value = "주소 추가", notes = "회원의 주소를 추가합니다.")
    @PostMapping("/register")
    public ResponseEntity<String> addressRegister(@RequestBody AddressRegisterDTO address, @ApiIgnore @AuthenticationPrincipal Member member) {
        addressService.addressRegister(address, member.getMemberId());
        return ResponseEntity.ok("address register success");
    }

    @ApiOperation(value = "주소 수정", notes = "회원의 주소를 수정합니다.")
    @PostMapping("/update")
    public ResponseEntity<String> addressUpdate(@RequestBody AddressUpdateDTO address, @ApiIgnore @AuthenticationPrincipal Member member) {
        addressService.addressUpdate(address, member.getMemberId());
        return ResponseEntity.ok("address update success");
    }

    @ApiOperation(value = "주소 삭제", notes = "회원의 주소를 삭제합니다.")
    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> addressDelete(@PathVariable Long addressId, @ApiIgnore @AuthenticationPrincipal Member member) {
        addressService.addressDelete(addressId, member.getMemberId());
        return ResponseEntity.ok("address delete success");
    }

}
