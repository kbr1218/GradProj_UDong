// ChoresUpdateDTO.java
package com.example.udongserver.domain.chores.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class ChoresUpdateDTO {
    @JsonProperty("id")
    private Long choresId;
    private String chores;
    private List<String> days;
    private Long assignedUserId;

    public ChoresUpdateDTO(Long choresId, String chores, List<String> days, Long assignedUserId) {
        this.choresId = choresId;
        this.chores = chores;
        this.days = days;
        this.assignedUserId = assignedUserId;
    }

}
