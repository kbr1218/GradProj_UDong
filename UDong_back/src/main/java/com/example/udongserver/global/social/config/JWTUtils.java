// JWTUtils.java
package com.example.udongserver.global.social.config;

import com.example.udongserver.domain.user.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class JWTUtils {
    private static final long TOKEN_VALIDITY = 172800000L;  // 2일
    private static final long TOKEN_VALIDITY_REMEMBER = 2592000000L; // 30일

    private final Key key;

    public JWTUtils(@Value("${app.jwtSecret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String createToken(User user, boolean rememberMe) {
        long now = (new Date()).getTime();

        // token 유효기간 설정
        Date validity = rememberMe ? new Date(now + TOKEN_VALIDITY_REMEMBER) : new Date(now + TOKEN_VALIDITY);

        // 만약 토큰의 유효기간이 10일 이하라면 유효기간 연장
        if (validity.getTime() - now < 10 * 24 * 3600 * 1000) {
            validity = new Date(now + TOKEN_VALIDITY_REMEMBER);
        }

        Claims claims = Jwts.claims().setSubject((user.getId().toString()));
        // 해쉬맵에 유저의 role을 저장한다.
        claims.put("role", user.getRole().getKey());

        log.info("validaity: " + validity);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

    }

    public Authentication verifyAndGetAuthentication(String token, HttpServletResponse res) {
        try {

            // 키 값을 이용해 token에 포함된 값들을 다 추출한다.
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // 클레임에서 역할(role) 정보 추출
            String roleKey = claims.get("role", String.class);
            // 역할 정보를 Spring Security에서 인식하는 형식으로 변환
            List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_", roleKey);

            // id, token, 권한 등 담긴 객체 리턴
            // Authentication 객체 생성하여 반환
            return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
        } catch (ExpiredJwtException e) {
            log.error("JWT 토큰 만료됨: {}", e.getMessage());
            deleteAuthTokenCookie(res);
            throw new BadCredentialsException("JWT 토큰이 만료되었습니다.");

        } catch (JwtException | IllegalArgumentException e) {
            log.error("JWT 토큰 검증 실패: {}", e.getMessage());
            deleteAuthTokenCookie(res);
            throw new BadCredentialsException("유효하지 않은 토큰입니다.");
        }
    }

    private void deleteAuthTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("AUTH-TOKEN", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
