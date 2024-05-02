// ChoresRepository.java
package com.example.udongserver.domain.chores;

import com.example.udongserver.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoresRepository extends JpaRepository<Chores, Long> {
    List<Chores> findByRoomId(Room room);
}