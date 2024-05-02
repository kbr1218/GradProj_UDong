// RoomCreationDTO.java
package com.example.udongserver.domain.room.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class RoomCreationDTO {
    @JsonProperty("id")
    private Long id;
    private String roomName;

}
