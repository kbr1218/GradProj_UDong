// InvitationController.java
package com.example.udongserver.domain.invitation;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/invitations")
public class InvitationController {
    private final InvitationService invitationService;

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    // 사용자를 초대했을 때 invitation 테이블 update
    @PostMapping("/invite/{inviterId}")
    public ResponseEntity<String> inviteUser(@PathVariable Long inviterId, @RequestBody Map<String, String> requestBody) {
        String inviteeEmail = requestBody.get("inviteeEmail");

        try {
            invitationService.inviteUser(inviterId, inviteeEmail);
            return new ResponseEntity<>("초대를 보냈습니다: " + inviteeEmail, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getInvitation/{inviteeId}")
    public ResponseEntity<Invitation> getInvitation(@PathVariable Long inviteeId) {
        Invitation invitation = invitationService.getInvitation(inviteeId);
        if (invitation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(invitation, HttpStatus.OK);
        }
    }

    // invitee가 inviter의 초대를 거절했을 때
    @DeleteMapping("/decline/{invitationId}")
    public ResponseEntity<String> declineInvitation(@PathVariable Long invitationId) {
        try {
            invitationService.declineInvitation(invitationId);
            return new ResponseEntity<>("초대를 거절했습니다. ", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // invitee가 inviter의 초대를 수락했을 때
    @PutMapping("/accept/{invitationId}")
    public ResponseEntity<String> acceptInvitation(@PathVariable Long invitationId) {
        try {
            invitationService.acceptInvitation(invitationId);
            return new ResponseEntity<>("초대를 수락했습니다. ", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
