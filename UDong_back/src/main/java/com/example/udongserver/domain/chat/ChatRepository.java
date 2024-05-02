// ChatRepository.java
package com.example.udongserver.domain.chat;

import com.example.udongserver.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByRoomId(Room room);
}