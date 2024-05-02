// Chores.java
package com.example.udongserver.domain.chores;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.global.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@Table(name = "chores")
@Entity
public class Chores extends BaseTimeEntity {
    public enum DayOfWeek {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String chores;

    @ElementCollection(targetClass = DayOfWeek.class)
    @Enumerated(EnumType.STRING)
    private List<DayOfWeek> days;

    @ManyToOne
    @JoinColumn(name = "assignedUserId")       // 집안일 배정된 유저 id, 만약 비어 있다면 공동
    private User assignedUser;

    @ManyToOne
    @JoinColumn(name = "roomId")    //해당 집안일 어느 방의 것인지
    @JsonBackReference
    private Room roomId;

    @Builder
    public Chores (Long id, String chores, List<DayOfWeek> days, User assignedUser, Room roomId){
        this.id = id;
        this.chores = chores;
        this.days = days;
        this.assignedUser = assignedUser;
        this.roomId = roomId;
    }

    public void setRoomId(Room roomId) { this.roomId = roomId; }

    public void setChores(String chores){
        this.chores = chores;
    }

    public void setAssignedUser(User assignedUser) {
        this.assignedUser = assignedUser;
    }

    public void setDays(List<DayOfWeek> days) { this.days = days; }

    public List<String> getDayStrings() {
        if (this.days == null) {
            return Collections.emptyList();
        }
        return this.days.stream()
                .map(DayOfWeek::toString)
                .collect(Collectors.toList());
    }
}