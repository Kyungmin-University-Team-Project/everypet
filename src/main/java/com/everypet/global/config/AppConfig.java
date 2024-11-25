package com.everypet.global.config;

import org.springframework.context.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

//@ComponentScan(basePackages = {"com.everypet.*.service","com.everypet.global.*.*.service", "com.everypet.global.config"})
//@Import({DatabaseConfig.class, MvcConfig.class, SecurityConfig.class, SwaggerConfig.class})
@Configuration
@ComponentScan(basePackages = {"com.everypet"})
@PropertySource(value = "classpath:application.properties", encoding = "UTF-8")
public class AppConfig {

    // 파일 업로드 설정
    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
        commonsMultipartResolver.setMaxUploadSize(2147483648L); // 2GB
        commonsMultipartResolver.setMaxInMemorySize(1073741824); // 1GB
        return commonsMultipartResolver;
    }

}
