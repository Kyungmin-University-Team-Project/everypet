package com.everypet.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({DatabaseConfig.class, DatabaseConfig.class, MvcConfig.class, SecurityConfig.class, SwaggerConfig.class})
public class AppConfig {
}
