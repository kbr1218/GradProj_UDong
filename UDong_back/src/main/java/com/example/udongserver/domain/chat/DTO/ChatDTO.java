// ChatDTO.java
package com.example.udongserver.domain.chat.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ChatDTO {
    private Long roomId;
    private Long senderId;
    private String message;
    private String time;

    public ChatDTO(Long roomId, Long senderId, String message, String time) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.message = message;
        this.time = time;
    }
}