package com.everypet.common.config;

import com.everypet.common.jwt.JWTFilter;
import com.everypet.common.jwt.JWTUtil;
import com.everypet.common.jwt.LoginFilter;
import com.everypet.member.service.UserLoginFailHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = {"com.everypet.*"})
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }
    @Bean
    public UserLoginFailHandler userLoginFailHandler() {
        return new UserLoginFailHandler();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 보안 설정
                .authorizeRequests() // 요청에 대한 보안 설정
                    .antMatchers("/resources/**").permitAll()
                    .antMatchers("/signin").permitAll()
                    .antMatchers("/signup").anonymous()
                    .antMatchers("/admin").hasRole("ADMIN")
                    .anyRequest().permitAll()
                    .and()
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class)
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class) // 필터 추가
                .httpBasic().disable()
                .formLogin().disable()
                    /*.loginPage("/")
                    .loginProcessingUrl("/signin")
                    .usernameParameter("member_id")
                    .passwordParameter("member_pwd")
                    .defaultSuccessUrl("/success")
                    .failureHandler(userLoginFailHandler())
                    .and */
                .logout().disable()
                    /*.logoutUrl("/logout")
                    .logoutSuccessUrl("/")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .and()*/
                .exceptionHandling() // 예외 처리
                    .accessDeniedPage("/")
                    .and()
                .sessionManagement() // 세션 관리
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .cors((corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                })));
    }

}