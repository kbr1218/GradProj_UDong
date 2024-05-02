// ChoresReturnDTO.java
package com.example.udongserver.domain.chores.DTO;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
@Data
public class ChoresReturnDTO {
    //집안일 내용과 assigned user id 리턴
    private Long id;
    private String chores;
    private List<String> days;
    private Long assignedUserId;
    private String assignedUserName; // 사용자 이름 추가

    public ChoresReturnDTO(Long id, String chores, List<String> days, Long assignedUserId, String assignedUserName) {
        this.id = id;
        this.chores = chores;
        this.days = days;
        this.assignedUserId = assignedUserId;
        this.assignedUserName = assignedUserName;
    }
}