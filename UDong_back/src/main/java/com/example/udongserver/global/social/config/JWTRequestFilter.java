// JWTRequestFilter.java
package com.example.udongserver.global.social.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@Slf4j
public class JWTRequestFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;

    // HTTP 요청이 들어올 때마다 실행되어 JWT 토큰을 확인하고 인증 정보를 설정
    public JWTRequestFilter(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        log.info("-----------------request method : " + request.getMethod());

        // preflight 요청인 경우 바로 통과
        if (StringUtils.equals(request.getMethod(), "OPTIONS")) {
            log.info("-----------------if request method is options, return true");
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        //authCookie에 "AUTH-TOKEN" (즉 서버에서 보내준 jwt token) 할당
        Cookie authCookie = cookies == null ? null : Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals("AUTH-TOKEN"))
                .findAny().orElse(null);


        Authentication authentication;

        // 만약 authCookie가 존재하고 해당 쿠키의 값이 유효한 JWT라면, 검증하고 인증 객체를 가져옴
        if (authCookie != null && (authentication = jwtUtils.verifyAndGetAuthentication(authCookie.getValue(), response)) != null) {
            log.info("-----------------jwt is valid");
            // 현재 사용자 인증정보 유지
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 현재 사용자 정보 로깅
            if (authentication.getPrincipal() != null) {
                Object principal = authentication.getPrincipal();
                log.info("-----------------사용자: {}", principal);
            } else {
                log.info("-----------------사용자 정보 없음");
            }
        }
        filterChain.doFilter(request, response);
    }
}
