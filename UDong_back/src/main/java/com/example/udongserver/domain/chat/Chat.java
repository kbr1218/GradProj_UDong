// Chat.java
package com.example.udongserver.domain.chat;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "chats")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "roomId")
    @JsonBackReference
    private Room roomId;

    @ManyToOne
    @JoinColumn(name = "senderId")
    private User sender;

    private String message;

    private LocalDateTime time;

    @Builder
    public Chat(Long id, Room roomId, User sender, String message, LocalDateTime time){
        this.id = id;
        this.roomId = roomId;
        this.sender = sender;
        this.message= message;
        this.time = time;
    }

    public void setRoomId(Room roomId) { this.roomId = roomId; }

    public void setMessage(String message) {
        this.message = message;
    }

}
