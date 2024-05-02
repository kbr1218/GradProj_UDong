// RuleService.java
package com.example.udongserver.domain.rule;

import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.room.RoomRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RuleService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RuleRepository ruleRepository;

    //규칙 리턴은 room return과 함께 리턴된다.
    public List<Rule> getRulesByRoomId(Long roomId) {
        return ruleRepository.findByRoomId(roomId);
    }

    //규칙 생성
    @Transactional
    public void createRules(Long roomId, String ruleContent) {
        try {
            log.info("Rule Service");
            log.info(String.valueOf(roomId));
            log.info(String.valueOf(ruleContent));

            // Room 객체 가져오기
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

            // 추가> 현재 해당 Room에 속한 규칙 개수 확인 (Rules은 최대 5개)
            List<Rule> existingRules = ruleRepository.findByRoomId(roomId);
            int totalRules = existingRules.size() + 1;

            // 최대 규칙 개수 체크
            int maxRulesAllowed = 5;
            if (totalRules > maxRulesAllowed) {
                throw new IllegalArgumentException("최대 규칙 개수를 초과했습니다. 현재 규칙의 개수: " + existingRules.size());
            }

            // 들어온 rules에 room 설정
            Rule newRule = Rule.builder()
                            .rule(ruleContent)
                            .room(room)
                            .build();

            // 규칙 저장
            ruleRepository.save(newRule);

        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
            throw new RuntimeException("Error creating rules: " + e.getMessage());
        }
    }

    public boolean deleteRule(Long ruleId) {
        Optional<Rule> optionalRule = ruleRepository.findById(ruleId);

        if (optionalRule.isPresent()) {
            ruleRepository.delete(optionalRule.get());
            return true;
        }
        return false;
    }
}