// TodoService.java
package com.example.udongserver.domain.todolist;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.room.RoomRepository;
import com.example.udongserver.domain.todolist.DTO.TodolistCreateDTO;
import com.example.udongserver.domain.todolist.DTO.TodolistReturnDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodolistService {
    private final TodolistRepository todolistRepository;
    private final RoomRepository roomRepository;

    // todolist 리턴
    @Transactional
    public List<TodolistReturnDTO> getTodo(Long roomId) {
        try {
            // 입력된 roomId에 해당하는 Room 객체 가져오기
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

            // Room에 속한 모든 투두 가져오기
            List<Todolist> todoList = todolistRepository.findByRoomId(room);

            return todoList.stream()
                    .map(todo -> {
                        return new TodolistReturnDTO(
                                todo.getId(),
                                todo.getContent(),
                                todo.getStatus(),
                                todo.getDate(),
                                todo.getAssignedUserName()
                        );
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error getting todo: " + e.getMessage());
        }
    }

    // todolist 생성
    @Transactional
    public void createTodo(Long roomId, TodolistCreateDTO todolistCreateDTO) {
        try {
            // room 객체 가져오기
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found."));

            //status 값 설정 (default : false)
            Boolean status = (todolistCreateDTO.getStatus() != null) ? todolistCreateDTO.getStatus() : false;

            Todolist todo = Todolist.builder()
                    .content(todolistCreateDTO.getContent())
                    .date(todolistCreateDTO.getDate())
                    .status(status)
                    .roomId(room)
                    .assignedUserName(todolistCreateDTO.getAssignedUserName())  // 할당된 사용자 이름 설정
                    .build();

            todolistRepository.save(todo);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating todo: " + e.getMessage());
        }
    }


    // todolist 삭제
    public boolean deleteTodo(Long todoId) {
        Optional<Todolist> optionalTodolist = todolistRepository.findById(todoId);

        if(optionalTodolist.isPresent()) {
            todolistRepository.delete(optionalTodolist.get());
            return true;
        }
        return false;
    }

    @Transactional
    public void updateTodoStatus(Long todoId, boolean newStatus) {
        try {
            Todolist todo = todolistRepository.findById(todoId)
                    .orElseThrow(() -> new IllegalArgumentException("Todo with id " + todoId + " not found."));

            todo.setStatus(newStatus);
            todolistRepository.save(todo);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error updating todo status: " + e.getMessage());
        }
    }
}