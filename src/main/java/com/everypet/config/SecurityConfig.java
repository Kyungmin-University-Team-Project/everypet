package com.everypet.config;

import com.everypet.auth.jwt.data.dao.RefreshTokenMapper;
import com.everypet.auth.jwt.filter.CustomLogoutFilter;
import com.everypet.auth.jwt.filter.JWTFilter;
import com.everypet.auth.jwt.util.CookieFactory;
import com.everypet.auth.jwt.util.JWTManager;
import com.everypet.auth.jwt.filter.LoginFilter;
import com.everypet.member.service.UserLoginFailHandler;
import com.everypet.auth.oauth2.CustomSuccessHandler;
import lombok.RequiredArgsConstructor;
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
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = {"com.everypet.*"})
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTManager jwtManager;
    //private final OAuth2UserService OAuth2UserService;
    private final CustomSuccessHandler customSuccessHandler;
    private final JWTFilter jwtFilter;
    private final RefreshTokenMapper refreshTokenMapper;
    private final CookieFactory cookieFactory;

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
        LoginFilter loginFilter = new LoginFilter(authenticationManager(authenticationConfiguration), jwtManager,
                refreshTokenMapper, cookieFactory);
        loginFilter.setFilterProcessesUrl("/signin"); // 실제 로그인을 처리할 URL을 입력

        http
                .authorizeRequests() // 요청에 대한 보안 설정
                    .antMatchers("/resources/**").permitAll()
                    .antMatchers("/signin").anonymous()
                    .antMatchers("/signup").anonymous()
                    .antMatchers("/").permitAll()
                    .antMatchers("/admin").hasRole("ADMIN")
                    .antMatchers("/reissue").permitAll()
                    .anyRequest().permitAll();

        http // 필터 위치
                .addFilterBefore(jwtFilter, LoginFilter.class)
                .addFilterBefore(new CustomLogoutFilter(jwtManager, refreshTokenMapper), LogoutFilter.class)
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtManager,
                                refreshTokenMapper, cookieFactory),
                            UsernamePasswordAuthenticationFilter.class)
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
        http
                .exceptionHandling() // 예외 처리
                    .accessDeniedPage("/");
        http
                .sessionManagement() // 세션 관리
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http // cors 설정
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

        // oauth2
        /*http
                .oauth2Login()
                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                        .userService(OAuth2UserService))
                .successHandler(customSuccessHandler);*/

    }

    /*@Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(
                naverClientRegistration(),
                googleClientRegistration()
        );
    }

    // 네이버 클라이언트 등록 정보
    private ClientRegistration naverClientRegistration() {
        return ClientRegistration.withRegistrationId("naver")
                .clientId("AQK44hOl5QLAU8J2AAY9")
                .clientSecret("2OuROg65tX")
                .redirectUriTemplate("http://localhost:8080/login/oauth2/code/naver")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .scope("name", "email")
                .authorizationUri("https://nid.naver.com/oauth2.0/authorize")
                .tokenUri("https://nid.naver.com/oauth2.0/token")
                .userInfoUri("https://openapi.naver.com/v1/nid/me")
                .userNameAttributeName("response")
                .clientName("naver")
                .build();
    }

    // 구글 클라이언트 등록 정보
    private ClientRegistration googleClientRegistration() {
        return ClientRegistration.withRegistrationId("google")
                .clientId("1004346528421-nlco24abaalsmfiv8mnda2scast1iafk.apps.googleusercontent.com")
                .clientSecret("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")
                .redirectUriTemplate("http://localhost:8080/login/oauth2/code/google")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .scope("profile", "email")
                .authorizationUri("https://accounts.google.com/o/oauth2/auth")
                .tokenUri("https://accounts.google.com/o/oauth2/token")
                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                .userNameAttributeName(IdTokenClaimNames.SUB)
                .clientName("google")
                .build();
    }*/
}