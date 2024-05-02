// User.java
package com.example.udongserver.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.global.BaseTimeEntity;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "roomId")
    @JsonBackReference
    private Room roomId;

    @Column
    private String pictureUrl;

    // JPA 로 데이터베이스로 저장할 때 Enum 값을 어떤 형태로 저장할지를 결정 (기본적으로 int 형식으로 저장됨)
    // 숫자로 저장되면 DB에서 확인할 때 그 값이 무슨 코드를 의미하는지 알 수 없음
    // => 문자열 (EnumType.STRING)로 저장될 수 있도록 선언
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public User (String name, String email, String pictureUrl, Role role) {
        this.name = name;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.role = role;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRoomId(Room roomId) {
        this.roomId = roomId;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

