package com.example.udongserver.domain.chores;

import com.example.udongserver.domain.chores.DTO.ChoresCreationDTO;
import com.example.udongserver.domain.chores.DTO.ChoresReturnDTO;
import com.example.udongserver.domain.chores.DTO.ChoresUpdateDTO;
import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.room.RoomRepository;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.udongserver.domain.chores.Chores.DayOfWeek;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ChoresService {
    private final ChoresRepository choresRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChoresService(
            ChoresRepository choresRepository,
            RoomRepository roomRepository,
            UserRepository userRepository
    ) {
        this.choresRepository = choresRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    // 집안일 정보 리턴
    @Transactional
    public List<ChoresReturnDTO> getChores(Long roomId) {
        // Room 존재여부 검사
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));
        // Room에 속한 모든 집안일(Chores)을 가져옴
        List<Chores> choresList = choresRepository.findByRoomId(room);

        return choresList.stream()
                .map(chore -> {
                    String assignedUserName = (chore.getAssignedUser() != null) ? chore.getAssignedUser().getName() : null;
                    return new ChoresReturnDTO(chore.getId(), chore.getChores(), chore.getDayStrings(), (chore.getAssignedUser() != null) ? chore.getAssignedUser().getId() : null, assignedUserName);
                })
                .collect(Collectors.toList());
    }

    // 집안일 생성
    @Transactional
    public void createChores(Long roomId, ChoresCreationDTO choresCreationDTO) {
        log.info("createChores 서비스 호출됨");
        // 주어진 roomId로 Room을 찾음
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

        // 주어진 assignedUserId로 User를 찾음
        User assignedUser = (choresCreationDTO.getAssignedUserId() != null) ?
                userRepository.findById(choresCreationDTO.getAssignedUserId())
                        .orElseThrow(() -> new IllegalArgumentException("User with id " + choresCreationDTO.getAssignedUserId() + " not found"))
                : null;
        List<DayOfWeek> days = choresCreationDTO.getDays();
        log.info(days.toString());

        // DTO를 엔티티로 변환
        Chores newChores = convertToEntity(choresCreationDTO, room, assignedUser);
        newChores.setDays(days); // 변환된 요일 값 설정

        // 저장
        choresRepository.save(newChores);
        log.info("저장됨");
    }

    // 집안일 업데이트
    @Transactional
    public boolean updateChores(ChoresUpdateDTO updateDTO) {
        try {
            Long choresId = updateDTO.getChoresId();
            Optional<Chores> optionalChores = choresRepository.findById(choresId);

            if (optionalChores.isPresent()) {
                Chores chores = optionalChores.get();

                // DTO로부터 업데이트할 내용을 가져와서 모든 필드를 한꺼번에 업데이트합니다.
                chores.setChores(updateDTO.getChores());

                // String으로 된 요일 목록을 DayOfWeek Enum으로 변환하여 설정합니다.
                List<Chores.DayOfWeek> days = updateDTO.getDays().stream()
                        .map(Chores.DayOfWeek::valueOf)
                        .collect(Collectors.toList());
                chores.setDays(days);

                // AssignedUserId가 null이 아닌 경우에만 업데이트합니다.
                if (updateDTO.getAssignedUserId() != null) {
                    Optional<User> optionalUser = userRepository.findById(updateDTO.getAssignedUserId());
                    if (optionalUser.isPresent()) {
                        User assignedUser = optionalUser.get();
                        chores.setAssignedUser(assignedUser);
                    } else {
                        throw new IllegalArgumentException("No user found with id " + updateDTO.getAssignedUserId());
                    }
                } else {
                    // AssignedUserId가 null이면 해당 필드를 null로 업데이트합니다.
                    chores.setAssignedUser(null);
                }
                choresRepository.save(chores);
            } else {
                throw new IllegalArgumentException("No chores found with id " + choresId);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating chores: " + e.getMessage());
        }
    }

     // 집안일 삭제
    @Transactional
    public boolean deleteChores(Long choresId) {
        try {
            Optional<Chores> optionalChores = choresRepository.findById(choresId);
            if (optionalChores.isPresent()) {
                // 단일 아이템 삭제
                choresRepository.delete(optionalChores.get());
                return true;
            } else {
                // 삭제할 아이템이 없을 경우 예외 처리
                throw new IllegalArgumentException("No chores found with id " + choresId);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error deleting chores: " + e.getMessage());
        }
    }

    // 방의 집안일 전체 삭제
    @Transactional
    public boolean deleteAllChores(Long roomId) {
        // Room 존재여부 검사
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));
        try {
            // 해당 roomId와 일치하는 chores 불러오기
            List<Chores> choresList = choresRepository.findByRoomId(room);
            if (!choresList.isEmpty()) {
                // 조회된 집안일이 존재할 경우 삭제
                choresRepository.deleteAll(choresList);
                return true;
            } else {
                // 해당 roomId와 일치하는 집안일이 없는 경우 예외 처리
                throw new IllegalArgumentException("No chores found for room with id " + roomId);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error deleting chores: " + e.getMessage());
        }
    }

    private Chores convertToEntity(ChoresCreationDTO choresCreationDTO, Room roomId, User assignedUser) {
        List<DayOfWeek> days = choresCreationDTO.getDays();

        return Chores.builder()
                .chores(choresCreationDTO.getChores())
                .assignedUser(assignedUser)
                .roomId(roomId)
                .days(days)
                .build();
    }

    // 문자열을 Enum 값으로 변환하는 메서드
    private DayOfWeek stringToDayOfWeek(String dayString) {
        // 대소문자를 무시하고 문자열을 Enum 값으로 변환
        return DayOfWeek.valueOf(dayString.toUpperCase());
    }
}