// RoomController.java
package com.example.udongserver.domain.room;

import com.example.udongserver.domain.room.DTO.RoomCreationDTO;
import com.example.udongserver.domain.room.DTO.RoomCreationResponseDTO;
import com.example.udongserver.domain.room.DTO.RoomReturnDTO;
import com.example.udongserver.domain.room.DTO.RoomUpdateDTO;
import com.example.udongserver.domain.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "api/room")
public class RoomController {
    private final RoomService roomService;
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    //방 정보 불러오기
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomReturnDTO> getRoomInfo(@PathVariable Long roomId) {
        log.info("getRoomInfo..............roomId : ...................." + roomId);
        RoomReturnDTO roomInfo = roomService.getRoomInfo(roomId);

        if (roomInfo != null) {
            log.info(String.valueOf(ResponseEntity.ok(roomInfo)));
            return ResponseEntity.ok(roomInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 방을 생성하는 POST 요청을 처리합니다.
    @PostMapping("/create")
    public ResponseEntity<RoomCreationResponseDTO> createRoom(@RequestBody RoomCreationDTO request) {
        log.info("createRoom..................................");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info(String.valueOf(authentication));
        if (authentication != null && authentication.isAuthenticated()) {
            log.info("------------in createRoom");
            String userIdString = authentication.getName(); // 사용자 ID를 문자열로 가져옵니다.
            Long userId = Long.parseLong(userIdString);

            RoomCreationResponseDTO responseDTO = roomService.createRoom(userId, request.getRoomName());

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } else {
            // 로그인한 사용자 정보가 없을 경우에 대한 처리
            log.info("unauthorized");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    //방 삭제
    @DeleteMapping("/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long roomId) {
        log.info("deleteRoom..................................");
        boolean deleted = roomService.deleteRoom(roomId);

        if (deleted) {
            String message = "방이 삭제되었습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "삭제할 방이 없습니다.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    //방 이름 변경
    @PutMapping("/updateRoomName")
    public ResponseEntity<String> updateRoomName(@RequestBody RoomUpdateDTO request) {
        log.info("updateRoomName..................................");
        boolean updated = roomService.updateRoomName(request);

        if (updated) {
            String message = "방 이름이 업데이트 되었습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "방 이름 업데이트에 실패했습니다.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}
