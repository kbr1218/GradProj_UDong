// Todolist.java
package com.example.udongserver.domain.todolist;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.global.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Table(name = "todoLists")
@Entity
public class Todolist extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=300, nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean status; // false: 아직 안 함, true: done

    @ManyToOne
    @JoinColumn(name = "roomId", nullable = false)
    @JsonBackReference  // 서로가 서로를 참조할 때 무한루프 방지 annotation
    private Room roomId;

    @Column(nullable = false)
    private LocalDate date;


    @Column
    private String assignedUserName;

    @Builder
    public Todolist(Long id, String content, Boolean status, Room roomId,
                    LocalDate date, String assignedUserName) {
        this.id = id;
        this.content = content;
        this.status = status;
        this.roomId = roomId;
        this.date = date;
        this.assignedUserName = assignedUserName;
    }

    public void setRoom(Room room) {
        this.roomId = room;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }

}
