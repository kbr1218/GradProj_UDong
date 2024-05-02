// RoomRepository.java
package com.example.udongserver.domain.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    // Room 엔티티에 대한 추가적인 메소드가 필요하다면 여기에 추가할 수 있습니다.

}
