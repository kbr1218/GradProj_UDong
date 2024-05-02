// InvitationService.java
package com.example.udongserver.domain.invitation;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.user.Role;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.domain.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private UserRepository userRepository;

    @Autowired
    public InvitationService(
            InvitationRepository invitationRepository,
            UserRepository userRepository
    ) {
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
    }

    // 사용자가 이메일을 입력해 다른 사용자를 방에 추가할 수 있도록 요청 보내기
    public void inviteUser(Long inviterId, String inviteeEmail) {
        Optional<User> inviterOptional = userRepository.findById(inviterId);
        Optional<User> inviteeOptional = userRepository.findByEmail(inviteeEmail);
        
        if (inviterOptional.isPresent() && inviteeOptional.isPresent()) {
            User inviter = inviterOptional.get();
            User invitee = inviteeOptional.get();
            Long inviteeId = inviteeOptional.get().getId();
            Optional<Invitation> invitationOptional = Optional.ofNullable(invitationRepository.findByInviteeId(inviteeId));

            // 초대를 보내는 사람의 방에 이미 두 명의 사용자가 있는 경우 초대 불가
            if (inviter.getRoomId() != null && inviter.getRoomId().getUsers().size() >= 2) {
                throw new IllegalArgumentException("해당 방에 이미 두 명의 사용자가 있습니다. ");
            }
            // 초대받은 사람이 이미 방이 있는 사람일 때
            else if (invitee.getRoomId() != null) {
                throw new IllegalArgumentException("해당 사용자는 이미 방이 있습니다. ");
            }

            // 초대 받은 사람이 기존에 받은 초대장이 있을 때
            else if (invitationOptional.isPresent()) {
                throw new IllegalArgumentException("해당 사용자는 이미 다른 초대를 받은 상태입니다.");
            }
            else {
                Invitation invitation = new Invitation();
                invitation.setInviter(inviter);
                invitation.setInvitee(invitee);
                invitationRepository.save(invitation);
            }
        } else {
            throw new EntityNotFoundException("ID에 해당하는 초대자 또는 초대받는 사람이 없습니다.");
        }
    }

    // 초대 거절
    public void declineInvitation(Long invitationId) {
        Optional<Invitation> invitationOptional = invitationRepository.findById(invitationId);

        if (invitationOptional.isPresent()) {
            invitationRepository.deleteById(invitationId);    // 해당 invitation 바로 삭제
        } else {
            throw new EntityNotFoundException("해당 초대를 찾을 수 없습니다. ");
        }
    }

    // 초대 수락 (invitee의 user 테이블 room_id에 값 추가 및 invitation 행 삭제
    public void acceptInvitation(Long invitationId) {
        Optional<Invitation> invitationOptional = invitationRepository.findById(invitationId);

        if (invitationOptional.isPresent()) {
            Invitation invitation = invitationOptional.get();
            User inviter = invitation.getInviter();
            User invitee = invitation.getInvitee();

            if (invitee.getRoomId() != null) {
                throw new IllegalArgumentException("해당 사용자는 이미 방이 있습니다. ");
            }

            // inviter의 roomId 가져오기
            Room inviterRoomId = inviter.getRoomId(); // inviter의 방 정보 가져오기

            invitee.setRoomId(inviterRoomId);
            invitee.setRole(Role.USER);   // invitee의 ROLE을 USER로 변경
            userRepository.save(invitee);

            // 초대가 끝났으므로 invitations 테이블에서 해당 초대 삭제
            invitationRepository.deleteById(invitationId);
        } else {
            throw new EntityNotFoundException("해당 초대를 찾을 수 없습니다. ");
        }
    }

    public Invitation getInvitation (Long inviteeId) {
        Invitation invitation = invitationRepository.findByInviteeId(inviteeId);
        if (invitation == null) {
            return null;
        }
        return invitation;
    }
}
