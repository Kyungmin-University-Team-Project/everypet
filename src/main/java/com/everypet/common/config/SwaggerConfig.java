package com.everypet.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
@EnableSwagger2
public class SwaggerConfig {

    // Swagger url = http://localhost:8080/swagger-ui.html

    private static final String API_NAME = "everypet API 명세";
    private static final String API_VERSION = "0.0.1";
    private static final String API_DESCRIPTION = "귀여운 프론트 엔드를 위한 명세서";

    @Bean
    //api() 메서드에서는 문서화 대상을 선택하고, API의 메타데이터를 설정한 후 **Docket** 객체를 반환.
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                //**apiInfo()** 메서드로부터 반환되는 **ApiInfo** 객체를 사용하여 API의 메타데이터(제목, 버전, 설명 등)를 설정
                .apiInfo(apiInfo())
                .groupName("home")
                .select()
                //API 문서화를 위해 스캔할 대상을 선택. 여기서는 **com.universestay.project** 패키지 내의 컨트롤러들을 대상으로 설정함.
                .apis(RequestHandlerSelectors.basePackage("com.everypet"))
        // **.paths(PathSelectors.any())**: 모든 경로를 문서화 대상으로 선택
        // 설정한 내용을 기반으로 **Docket** 객체를 구축하여 반환함.
                .build();
    }

    //**apiInfo()** 메서드에서는 API 문서의 제목, 버전, 설명 등을 설정한 후 **ApiInfo** 객체를 반환함. 이 설정은 Swagger UI를 통해 API 문서를 생성하고 표시하는 데 사용됨
    public ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(API_NAME)
                .version(API_VERSION)
                .description(API_DESCRIPTION)
                .build();
    }
}
