package com.example.udongserver.domain.todolist.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Data
public class TodolistReturnDTO {
    private Long id;
    private String content;
    private boolean status;
    private LocalDate date;
    private String assignedUserName;

    public TodolistReturnDTO(Long id, String content, boolean status, LocalDate date, String assignedUserName) {
        this.id = id;
        this.content = content;
        this.status = status;
        this.date = date;
        this.assignedUserName = assignedUserName;
    }
}
