// RuleController.java
package com.example.udongserver.domain.rule;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/room/rule")
public class RuleController {
    @Autowired
    private final RuleService ruleService;

    public RuleController(RuleService ruleService) {
        this.ruleService = ruleService;
    }

    // 특정 roomId에 해당하는 rule을 가져오는 get 요청
    @GetMapping("/{roomId}")
    public List<Rule> getRules(@PathVariable Long roomId) {
        return ruleService.getRulesByRoomId(roomId);
    }

    //rule 생성 post 요청 처리
    @PostMapping("/{roomId}")
    public ResponseEntity<String> createRule(@RequestBody String rule, @PathVariable Long roomId) {
        log.info(rule.toString());
        ruleService.createRules(roomId, rule);

        return new ResponseEntity<>("규칙이 성공적으로 생성되었습니다.", HttpStatus.CREATED);
    }

    // 규칙 삭제
    @DeleteMapping("/{ruleId}")
    public ResponseEntity<String> deleteRule(@PathVariable Long ruleId) {
        boolean deleted = ruleService.deleteRule(ruleId);

        if (deleted) {
            String message = "규칙이 삭제되었습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "삭제할 규칙이 없습니다.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }
}