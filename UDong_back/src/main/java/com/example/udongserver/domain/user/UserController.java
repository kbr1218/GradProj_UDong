// UserController.java
package com.example.udongserver.domain.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

import static com.example.udongserver.domain.user.DTO.UserDTO.convertToDTO;

@Slf4j
@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    UserService userService;

    // 사용자의 방에서 나가는 기능 (deleteUser)
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        try { // User 테이블에서 room_id 삭제
            userService.deleteUser(userId);
            return new ResponseEntity<>("UserId " + userId + "이(가) 방에서 나갔습니다.", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getUserInfo")
    public ResponseEntity getUserInfo(Principal principal) {
        log.info("-----------------getUserInfo");
        String userid = principal.getName();
        log.info("-----------------userid: {}", userid);

        User user = userService.getUser(Long.valueOf(userid));
        return ResponseEntity.ok().body(convertToDTO(user));
    }
}