// Rule.java
package com.example.udongserver.domain.rule;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.global.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Table(name = "rules")
@Entity
public class Rule extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rule;

    @ManyToOne
    @JoinColumn(name = "roomId")
    @JsonBackReference
    private Room room;

    @Builder
    public Rule(Long id, String rule, Room room) {
        this.id = id;
        this.rule = rule;
        this.room = room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
