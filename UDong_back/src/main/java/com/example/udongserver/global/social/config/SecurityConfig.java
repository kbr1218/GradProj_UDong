// SecurityConfig.java
package com.example.udongserver.global.social.config;

import com.example.udongserver.domain.user.Role;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Log4j2
@EnableWebSecurity            // Spring Security 설정 활성화
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final JWTRequestFilter jwtRequestFilter;

    public SecurityConfig(JWTRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("----------------------filterChain-------------------------");
        http
                .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/oauth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/oauth/logout").permitAll()
                        .requestMatchers(
                                new AntPathRequestMatcher("/"),
                                new AntPathRequestMatcher("/css/**"),
                                new AntPathRequestMatcher("/images/**"),
                                new AntPathRequestMatcher("/js/**"),
                                new AntPathRequestMatcher("/profile"),
                                new AntPathRequestMatcher("/oauth2/**"),
                                new AntPathRequestMatcher("/login/**"),
                                new AntPathRequestMatcher("/logout/**")
                        ).permitAll() // 로그인은 누구나 가능하도록
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/invitations/getInvitation/**"),
                                new AntPathRequestMatcher("/api/invitations/accept/**"),
                                new AntPathRequestMatcher("/api/invitations/decline/**"),
                                new AntPathRequestMatcher("/api/room/create"),
                                new AntPathRequestMatcher("/api/user/getUserInfo")
                        ).hasAnyRole(Role.USER.name(), Role.GUEST.name()) // 유저, 게스트 모두 접근 가능
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/**"),
                                new AntPathRequestMatcher("/chat/**"),
                                new AntPathRequestMatcher("/ws/**")
                        ).hasRole(Role.USER.name()) // 유저만 접근 가능
                        .anyRequest().authenticated()   // 그 외엔 모두 인증 필요
                )
                .logout((logout) -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("http://localhost:3000/login")
                        .invalidateHttpSession(true)
                        .deleteCookies("AUTH-TOKEN")
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource () {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:8080", "http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
        config.setMaxAge(3600L);

        // 요청 헤더 허용
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Origin", "Accept"));
        // 응답 헤더 허용
        config.setExposedHeaders(Arrays.asList("Authorization", "Content-Type", "Authorization-refresh"));
        // 요청 헤더에 올바른 인증 헤더가 있는지 확인
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}