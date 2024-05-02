// ChoresController.java
package com.example.udongserver.domain.chores;

import com.example.udongserver.domain.chores.DTO.ChoresCreationDTO;
import com.example.udongserver.domain.chores.DTO.ChoresReturnDTO;
import com.example.udongserver.domain.chores.DTO.ChoresUpdateDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/api/chores")
public class ChoresController {
    private final ChoresService choresService;

    public ChoresController(ChoresService choresService) {
        this.choresService = choresService;
    }

    // 집안일 리턴
    @GetMapping("/get/{roomId}")
    public ResponseEntity<List<ChoresReturnDTO>> getChores(@PathVariable Long roomId) {
        List<ChoresReturnDTO> choresList = choresService.getChores(roomId);
        if (!choresList.isEmpty()) {
            return ResponseEntity.ok(choresList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 집안일 생성
    @PostMapping("/create/{roomId}")
    public ResponseEntity<String> createChores(@PathVariable Long roomId, @RequestBody ChoresCreationDTO creationDTO) {
        log.info("i'm in controller postmapping rn");
        choresService.createChores(roomId, creationDTO);

        return new ResponseEntity<>("집안일이 성공적으로 생성되었습니다.", HttpStatus.CREATED);
    }

    // 집안일 수정
    @PutMapping("/update")
    public ResponseEntity<String> updateChores(@RequestBody ChoresUpdateDTO updateDTO) {
        boolean updated = choresService.updateChores(updateDTO);
        if (updated) {
            String message = "집안일 업데이트 되었습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "업데이트에 실패했습니다.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    // 집안일 삭제
    @DeleteMapping("delete/{choreId}")
    public ResponseEntity<String> deleteChores(@PathVariable Long choreId) {
        log.info("delete"+choreId);
        boolean deleted = choresService.deleteChores(choreId);

        if (deleted) {
            String message = "집안일이 삭제 되었습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "삭제에 실패했습니다.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

    // 집안일 전체 삭제
    @DeleteMapping("/deleteAll/{roomId}")
    public ResponseEntity<String> deleteAllChores(@PathVariable Long roomId) {
        boolean deleted = choresService.deleteAllChores(roomId);

        if (deleted) {
            String message = "해당 방의 집안일이 모두 삭제되었습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "해당 방의 집안일 삭제에 실패했습니다.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}