// RoomReturnDTO.java
package com.example.udongserver.domain.room.DTO;

import com.example.udongserver.domain.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
@Data
public class RoomReturnDTO {
    //room 전체 정보 리턴 DTO
    // 방 이름, 유저 이름, 방 규칙 등.. 리턴
    private String roomName;
    private List<User> userList;
}
