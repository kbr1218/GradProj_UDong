// RoomCreationResponseDTO.java
package com.example.udongserver.domain.room.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RoomCreationResponseDTO {
    private Long roomId;
    private String roomName;
}
