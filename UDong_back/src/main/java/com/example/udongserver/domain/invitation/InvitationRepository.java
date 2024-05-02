// InvitationRepository.java
package com.example.udongserver.domain.invitation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Invitation findByInviteeId(Long InviteeId);
}
