// UserService.java
package com.example.udongserver.domain.user;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.room.RoomRepository;
import com.example.udongserver.domain.user.DTO.IdTokenRequestDTO;
import com.example.udongserver.global.social.config.JWTUtils;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final JWTUtils jwtUtils;
    private final GoogleIdTokenVerifier verifier;

    public UserService(@Value("${app.googleClientId}") String clientId, UserRepository userRepository, RoomRepository roomRepository, JWTUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.jwtUtils = jwtUtils;
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자 ID: " + userId + "를 찾을 수 없습니다. "));
    }

    // 유저 삭제 (방 나가기)
    public void deleteUser(Long userId) {
        User user = getUser(userId);

        if(user != null) {
            user.setRole(Role.GUEST);
            Room room = user.getRoomId();
            user.setRoomId(null);
            userRepository.save(user);
            deleteRoomIfNoUsers(room);
        }
    }

    public void deleteRoomIfNoUsers(Room room) {
        if (room != null) {
            long usersCountInRoom = userRepository.countByRoomId(room);
            if (usersCountInRoom == 0) {
                roomRepository.deleteById(room.getId());
            }
        }
    }

    public String loginOAuthGoogle(IdTokenRequestDTO requestBody) {
        User user = verifyIDToken(requestBody.getIdToken());
        if (user == null) {
            throw new IllegalArgumentException();
        }
        user = createOrUpdateUser(user);
        return jwtUtils.createToken(user, true);
    }

    @Transactional
    public User createOrUpdateUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);
        if (existingUser == null) {
            user.setRole(Role.GUEST);
            userRepository.save(user);
            return user;
        }
        existingUser.setName(user.getName());
        existingUser.setPictureUrl(user.getPictureUrl());
        userRepository.save(existingUser);
        return existingUser;
    }

    private User verifyIDToken(String idToken) {
        try {
            log.info("------------idToken: " + idToken);
            GoogleIdToken idTokenObj = verifier.verify(idToken);
            log.info("------------idTokenObj: " + idTokenObj);
            if (idTokenObj == null) {
                return null;
            }

            // 토큰이 올바른 경우, 구글로부터 유저 정보를 받아와 user 객체를 생성하고 리턴한다.
            GoogleIdToken.Payload payload = idTokenObj.getPayload();
            log.info("------------payload: " + payload);
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String name = "";

            if (firstName != null && !firstName.isEmpty() && lastName != null && !lastName.isEmpty()) {
                // 둘 다 존재할 경우
                name = lastName + firstName;
                log.info("---------- name: " + name);
            } else if (firstName != null && !firstName.isEmpty()) {
                // firstName만 존재할 경우
                name = firstName;
                log.info("---------- name: " + name);
            } else if (lastName != null && !lastName.isEmpty()) {
                // lastName만 존재할 경우
                name = lastName;
                log.info("---------- name: " + name);
            }

            String email = payload.getEmail();
            String pictureUrl = (String) payload.get("picture");

            return new User(name, email, pictureUrl, Role.GUEST);
        } catch (GeneralSecurityException | IOException e) {
            return null;
        }
    }
}