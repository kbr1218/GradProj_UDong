package com.example.udongserver.domain.regular;

import com.example.udongserver.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RegularRepository extends JpaRepository<Regular, Long> {
    List<Regular> findByRoomId(Room room);
}
