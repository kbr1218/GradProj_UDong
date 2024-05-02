package com.example.udongserver.domain.regular;

import com.example.udongserver.domain.room.Room;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Table(name = "regulars")
@Entity
public class Regular {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String item;

    @ManyToOne
    @JoinColumn(name = "roomId")
    @JsonBackReference
    private Room roomId;

    @Column(nullable = false)
    private Integer frequency; //ex) 7,14, 30, 60, 90

    @Column(length = 300)
    private String memo;    // 기타 적고 싶은거 있으면 적는칸 ex) 00사 섬유유연제는 향이 별로


    @Builder
    public Regular (Long id, String item, Room roomId, Integer frequency, String memo) {
        this.id = id;
        this.item = item;
        this.roomId = roomId;
        this.frequency = frequency;
        this.memo = memo;
    }

    public void setRoomId(Room roomId) { this.roomId = roomId; }

    public void setItem(String item){
        this.item = item;
    }

    public void setFrequency(Integer frequency) {
        this.frequency = frequency;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}
