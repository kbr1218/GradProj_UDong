// RoomService.java
package com.example.udongserver.domain.room;

import com.example.udongserver.domain.room.DTO.RoomCreationResponseDTO;
import com.example.udongserver.domain.room.DTO.RoomReturnDTO;
import com.example.udongserver.domain.room.DTO.RoomUpdateDTO;
import com.example.udongserver.domain.rule.Rule;
import com.example.udongserver.domain.user.Role;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    // 방 생성
    @Transactional
    public RoomCreationResponseDTO createRoom(Long userId, String name) {
        try {
            log.info("Room Service");
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

            Room roomToCreate = new Room();
            roomToCreate.setRoomName(name);
            // Room 저장
            Room createdRoom = roomRepository.save(roomToCreate);

            // User에게 생성된 Room의 id를 설정하여 저장
            user.setRoomId(createdRoom);
            user.setRole(Role.USER);

            // 수정된 정보 업뎃
            userRepository.save(user);

            RoomCreationResponseDTO responseDTO = new RoomCreationResponseDTO();
            responseDTO.setRoomId(createdRoom.getId());
            responseDTO.setRoomName(createdRoom.getRoomName());

            return responseDTO;
        } catch (Exception e) {
            // 예외 처리
            throw new RuntimeException("Error creating room: " + e.getMessage());
        }
    }


    //방 정보 리턴
    @Transactional
    public RoomReturnDTO getRoomInfo(Long roomId) {
        log.info("Room Service");
        log.info(String.valueOf(roomId));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

        if (room != null) {
            RoomReturnDTO roomInfo = new RoomReturnDTO();
            roomInfo.setRoomName(room.getRoomName());
            roomInfo.setUserList(room.getUsers());

            log.info("roomInfo : " + roomInfo);
            return roomInfo;
        } else {
            return null;
        }
    }


    // 방 삭제
    public boolean deleteRoom(Long roomId) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);

        if (optionalRoom.isPresent()) {
            Room roomToDelete = optionalRoom.get();

            // 사용자의 room_id를 null로 설정
            for (User user : roomToDelete.getUsers()) {
                user.setRoomId(null);
            }
            roomRepository.delete(roomToDelete);
            return true;
        }
        return false;
    }

    //방 이름 변경
    public boolean updateRoomName(RoomUpdateDTO dto) {
        try {
            Optional<Room> optionalRoom = roomRepository.findById(dto.getId());
            if (optionalRoom.isPresent()) {
                Room room = optionalRoom.get();
                room.setRoomName(dto.getRoomName());
                roomRepository.save(room);

                return true;
            } else {
                throw new IllegalArgumentException("No room found with id " + dto.getId());
            }
        } catch (Exception e) {
            log.error("Error updating room name: " + e.getMessage());
            throw new RuntimeException("Error updating room name: " + e.getMessage());
        }
    }
}
