// ChatReturnDTO
package com.example.udongserver.domain.chat.DTO;

import com.example.udongserver.domain.chat.Chat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChatReturnDTO {
    private LocalDateTime time;
    private Long senderId;
    private String senderName;
    private String message;

    @Builder
    public ChatReturnDTO(Chat chat) {
        this.time = chat.getTime();
        this.senderId = chat.getSender().getId();
        this.senderName = chat.getSender().getName();
        this.message = chat.getMessage();
    }
}