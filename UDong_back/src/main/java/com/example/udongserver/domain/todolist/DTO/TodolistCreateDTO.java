// TodolistCreationDTO.java
package com.example.udongserver.domain.todolist.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TodolistCreateDTO {
    private String content;
    private LocalDate date;
    private Boolean status;
    private String assignedUserName;
}
