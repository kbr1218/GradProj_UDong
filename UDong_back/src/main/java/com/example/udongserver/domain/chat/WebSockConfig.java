// WebSockConfig.java
package com.example.udongserver.domain.chat;

import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

import static org.springframework.messaging.simp.stomp.StompHeaders.SESSION;

/**
 * web socket config 작성
 * 위에서 만든 web socket chat handler 이용하여 web socket 활성화 하기 위한 config 파일 작성
 * @EnableWebSocket 작성해 활성화
 * end point 작성 -> /ws/chat
 * CORS: setAllowOrigins("*)" 작성 --- 모든 ip 접속 허가
 */

@Configuration
@EnableWebSocketMessageBroker
@EnableWebSocket
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //ws://localhost:8080/ws
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:3000", "http://localhost:8080")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 메시지 발행 요청의 prefix, -> @MessageMapping으로 바운드된다.
        // pub
        config.setApplicationDestinationPrefixes("/app");

        // 메시지 구독 요청의 prefix, /sub가 prefix로 붙은 destination의 클라이언트에게 메시지를 보낼 수 있도록
        //sub
        config.enableSimpleBroker("/chat", "/chatroom");

    }



    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.addDecoratorFactory(new WebSocketHandlerDecoratorFactory() {
            @Override
            public WebSocketHandler decorate(WebSocketHandler handler) {
                return new WebSocketHandlerDecorator(handler) {
                    @Override
                    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
                        super.afterConnectionEstablished(session);
                        System.out.println("WebSocket connection established: " + session.getId());
                    }

                    @Override
                    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
                        super.afterConnectionClosed(session, closeStatus);
                        System.out.println("WebSocket connection closed: " + session.getId() + ", CloseStatus: " + closeStatus);
                    }

                };
            }
        });
    }

}