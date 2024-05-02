package com.example.udongserver.domain.chat.DTO;

import lombok.Getter;

@Getter
public class ChatResponseDTO extends ChatDTO {
    private String senderName;
    private Object gptResponse;

    public ChatResponseDTO(ChatDTO chatDTO, String senderName, Object gptResponse) {
        super(chatDTO.getRoomId(), chatDTO.getSenderId(), chatDTO.getMessage(), chatDTO.getTime());
        this.senderName = senderName;
        this.gptResponse = gptResponse;
    }


    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public void setGptResponse(Object gptResponse) {
        this.gptResponse = gptResponse;
    }
}