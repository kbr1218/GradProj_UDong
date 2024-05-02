// ChatService.java
package com.example.udongserver.domain.chat;

import com.example.udongserver.domain.chat.DTO.ChatDTO;
import com.example.udongserver.domain.chat.DTO.ChatReturnDTO;
import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.room.RoomRepository;
import com.example.udongserver.domain.user.User;
import com.example.udongserver.domain.user.UserRepository;
import com.example.udongserver.global.GPT.GPTService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final GPTService gptService;

    // 채팅 내용 불러오기
    @Transactional
    public List<ChatReturnDTO> getChat(Long roomId) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

        List<Chat> chatList = chatRepository.findByRoomId(room);

        return convertToDTO(chatList);
    }

    // 채팅 내용 저장 + GPT API 호출
    @Transactional
    public Object saveChat(ChatDTO message){

        // 주어진 roomId로 Room을 찾음
        Room room = roomRepository.findById(message.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + message.getRoomId() + " not found"));

        // 사용자 ID로 사용자 찾기
        User user = userRepository.findById(message.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + message.getSenderId() + " not found. "));

        String isoDateTimeString = message.getTime();

        LocalDateTime localDateTime = LocalDateTime.parse(isoDateTimeString, DateTimeFormatter.ISO_DATE_TIME);

        // 채팅 메시지 엔티티 생성
        Chat chat = Chat.builder()
                .roomId(room)
                .sender(user)
                .message(message.getMessage())
                .time(localDateTime)
                .build();

        // 채팅 메시지 저장
        Chat savedChat = chatRepository.save(chat);
        log.info("Chat saved with ID: {}", savedChat.getId());

        // GPT 호출 결과 반환
        return gptService.invokeGPTRequest(savedChat.getId());
    }

    private Chat convertToEntity(Room roomId, ChatDTO chat) {

        User user = userRepository.findById(chat.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("User with id " + chat.getSenderId() + " not found."));
        return Chat.builder()
                .roomId(roomId)
                .sender(user)
                .message(chat.getMessage())
                .build();
    }

    private List<ChatReturnDTO> convertToDTO(List<Chat> chatList) {
        return chatList.stream()
                .map(ChatReturnDTO::new)
                .collect(Collectors.toList());
    }

}