package com.everypet.member.controller;

import com.everypet.member.data.dto.SignupRequestDTO;
import com.everypet.member.data.vo.Address;
import com.everypet.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class MemberApiControllerTest {

    @InjectMocks
    private MemberApiController memberApiController;

    @Mock
    private MemberService memberService;

    private MockMvc mockMvc;

    private SignupRequestDTO member;

    private ObjectMapper mapper; // 수동으로 초기화

    @Before
    public void setUp() {

        member = SignupRequestDTO.builder()
                .memberId("mockId")
                .memberPwd("123")
                .name("가짜계정")
                .email("abc@naver.com")
                .phone("010-1234-5678")
                .agreeMarketingYn('N').build();
        
        mockMvc = MockMvcBuilders.standaloneSetup(memberApiController).build();
        mapper = new ObjectMapper(); // ObjectMapper 초기화
    }

    @Test
    public void signUp() throws Exception {
        // 회원가입 메서드에 대한 테스트 코드 작성
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(member)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();

        String content = result.getResponse().getContentAsString();
        assertEquals("회원 가입 완료", content);
    }

    @Test
    public void addressRegister() throws Exception {
        // 주소등록 메서드에 대한 테스트 코드 작성
        Address address = Address.builder()
                .memberId("mockId")
                .address("서울시 강남구")
                .receiver("이용호")
                .phone("010-1234-5678")
                .request("문 앞에 놔주세요")
                .defaultYn('Y').build();

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/address/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(address)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();

        String content = result.getResponse().getContentAsString();
        assertEquals("주소 등록 완료", content);
    }

    @Test
    public void admin() {
        // admin 메서드에 대한 테스트 코드 작성
    }

    @Test
    public void user() {
        // user 메서드에 대한 테스트 코드 작성
    }

}

