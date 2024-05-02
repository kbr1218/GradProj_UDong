// ChoresCreationDTO.java
package com.example.udongserver.domain.chores.DTO;

import com.example.udongserver.domain.chores.Chores;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class ChoresCreationDTO {
    private String chores;
    private List<Chores.DayOfWeek> days; // List 타입 변경
    private Long assignedUserId;
}