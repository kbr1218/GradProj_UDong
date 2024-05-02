// UserRepository.java
package com.example.udongserver.domain.user;

import com.example.udongserver.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRoomId(Room roomId);

    long countByRoomId(Room room);
    Optional<User> findById(Long userId);
}
