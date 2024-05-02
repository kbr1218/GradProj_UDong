// Invitation.java
package com.example.udongserver.domain.invitation;

import com.example.udongserver.domain.user.User;
import com.example.udongserver.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Table(name = "invitations")
@Entity
public class Invitation extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "inviterId")       // Invitation의 초대한 사용자 id
    private User inviter;                  // inviter_id를 사용해 User 테이블을 참조합

    @ManyToOne
    @JoinColumn(name = "inviteeId")       // Invitation의 초대받는 사용자 id
    private User invitee;                  // invitee_id를 사용해 User 테이블을 참조

    @Builder
    public Invitation (Long id, User inviter, User invitee){
        this.id = id;
        this.inviter = inviter;
        this.invitee = invitee;
    }

    public void setInviter(User inviter) {
        this.inviter = inviter;
    }
    public void setInvitee(User invitee) {
        this.invitee = invitee;
    }
}
