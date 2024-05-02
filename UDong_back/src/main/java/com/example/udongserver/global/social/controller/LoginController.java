// LoginController.java
package com.example.udongserver.global.social.controller;

import com.example.udongserver.domain.user.DTO.IdTokenRequestDTO;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.domain.user.UserRepository;
import com.example.udongserver.domain.user.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/oauth")
public class LoginController {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    // 프론트의 로그인 요청 시.
    // 프론트는 구글에서 받은 access token을 헤더 쿠키에 담아서 보내준다.
    @PostMapping("/login")
    public ResponseEntity LoginWithGoogleOauth2(@RequestBody IdTokenRequestDTO requestBody, HttpServletResponse response) {
        log.info("-----------------LoginWithGoogleOauth2 시작");
        String authToken = userService.loginOAuthGoogle(requestBody);
        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                .httpOnly(true)
                .maxAge(7*24*3600)
                .path("/")
                .secure(false)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        log.info("-----------------AUTH-TOKEN: " + authToken);

        return ResponseEntity.ok().build();
    }
}
