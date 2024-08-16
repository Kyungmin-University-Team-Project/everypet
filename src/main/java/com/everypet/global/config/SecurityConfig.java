package com.everypet.global.config;

import com.everypet.global.auth.jwt.repository.RefreshTokenRepository;
import com.everypet.global.auth.jwt.filter.CustomLogoutFilter;
import com.everypet.global.auth.jwt.filter.JWTFilter;
import com.everypet.global.auth.jwt.filter.LoginFilter;
import com.everypet.global.auth.oauth2.config.CustomClientRegistrationRepo;
import com.everypet.global.auth.oauth2.handler.CustomSuccessHandler;
import com.everypet.global.auth.oauth2.service.CustomOAuth2UserService;
import com.everypet.global.auth.util.CookieManager;
import com.everypet.global.auth.util.JWTManager;
import com.everypet.member.service.UserLoginFailHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
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
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

//@ComponentScan(basePackages = "com.everypet.global.auth.*")
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTManager jwtManager;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomClientRegistrationRepo customClientRegistrationRepo;
    private final CustomSuccessHandler customSuccessHandler;
    private final JWTFilter jwtFilter;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieManager cookieManager;

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

        // 로그인 필터 추가
        LoginFilter loginFilter = new LoginFilter(authenticationManager(authenticationConfiguration), jwtManager, cookieManager);
        loginFilter.setFilterProcessesUrl("/signin"); // 실제 로그인을 처리할 URL을 입력

        http
                .authorizeRequests() // 요청에 대한 보안 설정
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/ws/**").permitAll()
                .antMatchers("/send-mail/**").permitAll()
                .antMatchers("/member/password/reset").permitAll()
                .antMatchers("/member/id/find").permitAll()
                .antMatchers("/signin").anonymous()
                .antMatchers("/signup").anonymous()
                .antMatchers("/").permitAll()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/user").hasRole("USER")
                .antMatchers("/reissue").permitAll()
                .anyRequest().permitAll();

        http // 필터 위치
                .addFilterBefore(jwtFilter, LoginFilter.class)
                .addFilterBefore(new CustomLogoutFilter(jwtManager, refreshTokenRepository), LogoutFilter.class)
                .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);

        http // disable 설정
                .httpBasic().disable()  //http basic 인증 방식 disable
                .formLogin().disable()
                .csrf().disable()
                /*.loginPage("/")
                .loginProcessingUrl("/signin")
                .usernameParameter("member_id")
                .passwordParameter("member_pwd")
                .defaultSuccessUrl("/success")
                .failureHandler(userLoginFailHandler())
                .and */
                .logout().disable();
                    /*.logoutUrl("/logout")
                    .logoutSuccessUrl("/")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .and()*/

        // 예외처리
        http
                .exceptionHandling()
                .accessDeniedPage("/");

        // 세션 설정
        http
                .sessionManagement() 
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        // cors 설정
        http 
                .cors((corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));  // 해당 IP에 응답을 허용
                        configuration.setAllowedMethods(Collections.singletonList("*")); // 모든 post, get, put, delete, patch 요청을 허용
                        configuration.setAllowCredentials(true);    // 내 서버에 json응답을 자바스크립가 처리할수 있게 설정
                        configuration.setAllowedHeaders(Collections.singletonList("*")); // 모든 header에 응답을 허용
                        //configuration.addAllowedHeader("*");        // 모든 header에 응답을 허용
                        //configuration.addAllowedMethod("*");        // 모든 post, get, put, delete, patch 요청을 허용
                        configuration.setMaxAge(3600L);             // 3600초 동안 캐싱

                        //configuration.addExposedHeader("*");

                        configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
                        configuration.setExposedHeaders(Collections.singletonList("access"));

                        return configuration;
                    }
                })));

        // oauth2
        http
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfoEndpointConfig -> userInfoEndpointConfig.userService(customOAuth2UserService)))
                        .clientRegistrationRepository(customClientRegistrationRepo.clientRegistrationRepository())
                        .successHandler(customSuccessHandler)
                );

    }
}