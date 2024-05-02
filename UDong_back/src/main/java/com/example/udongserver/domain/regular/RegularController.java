package com.example.udongserver.domain.regular;


import com.example.udongserver.domain.regular.DTO.RegularDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/regulars")
@RestController
public class RegularController {

    private final RegularService regularService;

    // get
    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRegulars(@PathVariable Long roomId) {
        List<RegularDTO> regularList = regularService.getRegulars(roomId);
        if (!regularList.isEmpty()) {
            return ResponseEntity.ok(regularList);
        } else {
            String message = "저장된 품목이 없습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
    }

    // create
    @PostMapping("/{roomId}")
    public ResponseEntity<String> createRegulars(@PathVariable Long roomId, @RequestBody RegularDTO dto) {
        regularService.createRegulars(roomId, dto);

        return new ResponseEntity<>("저장됨", HttpStatus.OK);
    }

    // update
    @PutMapping("/{regularId}")
    public ResponseEntity<String> updateRegulars(@PathVariable Long regularId, @RequestBody RegularDTO dto) {
        regularService.updateRegulars(regularId, dto);
        return new ResponseEntity<>("정기구매 품목이 성공적으로 수정되었습니다. ", HttpStatus.OK);
    }

    // delete
    @DeleteMapping("/{regularId}")
    public ResponseEntity<String> deleteRegulars(@PathVariable Long regularId) {
        boolean deleted = regularService.deleteRegulars(regularId);
        if (deleted) {
            return new ResponseEntity<>("정기구매 품목이 삭제되었습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("삭제할 아이템이 없습니다.", HttpStatus.NOT_FOUND);
        }
    }
}
