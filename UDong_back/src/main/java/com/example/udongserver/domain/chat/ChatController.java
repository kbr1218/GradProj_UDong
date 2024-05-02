// ChatController.java
package com.example.udongserver.domain.chat;

import com.example.udongserver.domain.chat.DTO.ChatDTO;
import com.example.udongserver.domain.chat.DTO.ChatResponseDTO;
import com.example.udongserver.domain.chat.DTO.ChatReturnDTO;
import com.example.udongserver.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;
    private final UserRepository userRepository;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public ResponseEntity<ChatResponseDTO> receiveMessage(@Payload ChatDTO message) {
        String senderName = userRepository.findById(message.getSenderId()).get().getName();
        Object gptResponse = chatService.saveChat(message);

        ChatResponseDTO responseDTO = new ChatResponseDTO(message, senderName, gptResponse);
        return ResponseEntity.ok(responseDTO);
    }

      //채팅 기록 불러오기
    @GetMapping("/chat/{roomId}")
    public ResponseEntity<?> getChat(@PathVariable Long roomId) {
        List<ChatReturnDTO> chatList = chatService.getChat(roomId);
        if (!chatList.isEmpty()) {
            return ResponseEntity.ok(chatList);
        } else {
            String message = "채팅 기록이 없습니다.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
    }
}
