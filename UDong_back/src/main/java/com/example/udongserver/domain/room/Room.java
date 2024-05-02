// Room.java
package com.example.udongserver.domain.room;

import com.example.udongserver.domain.chores.Chores;
import com.example.udongserver.domain.rule.Rule;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.global.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "rooms")
@Entity
public class Room extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomName;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Rule> rules;

    @OneToMany(mappedBy = "roomId", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<User> users;

    @OneToMany(mappedBy = "roomId", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Chores> chores;

    @Builder
    public Room(Long id, String roomName, List<Rule> rules, List<User> users, List<Chores> chores){
        this.id = id;
        this.roomName = roomName;
        this.rules = rules;
        this.users = users;
        this.chores = chores;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
