// TodoController.java
package com.example.udongserver.domain.todolist;

import com.example.udongserver.domain.todolist.DTO.TodolistCreateDTO;
import com.example.udongserver.domain.todolist.DTO.TodolistReturnDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/api/todolist")
@RestController
public class TodolistController {
    private final TodolistService todolistService;

    public TodolistController(TodolistService todolistService) {
        this.todolistService = todolistService;
    }

    // Todolist 가져오기 (get)
    @GetMapping("/get/{roomId}")
    public ResponseEntity<List<TodolistReturnDTO>> getTodo(@PathVariable Long roomId) {
        log.info("get todo controller");
        List<TodolistReturnDTO> todo = todolistService.getTodo(roomId);
        log.info(todo.toString());
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    // Todolist 추가
    @PostMapping("/create/{roomId}")
    public ResponseEntity<String> createTodo(@PathVariable Long roomId, @RequestBody TodolistCreateDTO createTodoDTO) {
        todolistService.createTodo(roomId, createTodoDTO);
        return new ResponseEntity<>("Todo가 성공적으로 생성되었습니다.", HttpStatus.CREATED);
    }

    @PutMapping("/update/status/{todoId}")
    public ResponseEntity<String> updateTodoStatus(@PathVariable Long todoId, @RequestBody boolean newStatus) {
        try {
            todolistService.updateTodoStatus(todoId, newStatus);
            return new ResponseEntity<>("Todo의 상태가 성공적으로 수정되었습니다.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Todo의 상태를 수정하는 중에 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Todolist 삭제
    @DeleteMapping("/delete/{todoId}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long todoId) {
        boolean deleted = todolistService.deleteTodo(todoId);

        if (deleted) {
            return new ResponseEntity<>("Todo가 삭제되었습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("삭제할 Todo가 없습니다.", HttpStatus.NOT_FOUND);
        }
    }
}


