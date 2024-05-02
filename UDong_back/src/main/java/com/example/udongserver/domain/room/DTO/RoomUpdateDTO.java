package com.example.udongserver.domain.room.DTO;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class RoomUpdateDTO {
    private Long id;          // 방의 Id
    private String roomName;  // 새로운 방의 이름
}
