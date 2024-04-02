package com.everypet.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;

@Configuration
@Import({DatabaseConfig.class, DatabaseConfig.class, MvcConfig.class, SecurityConfig.class, SwaggerConfig.class})
public class AppConfig {
}
