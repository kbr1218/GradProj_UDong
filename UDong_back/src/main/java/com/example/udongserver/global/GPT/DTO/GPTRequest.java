// GPTRequest.java
package com.example.udongserver.global.GPT.DTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class GPTRequest {
    private String model;
    private List<Message> messages;
    private double presencePenalty;

    public GPTRequest(String model, LocalDateTime createdDate, String content) {
        this.model = model;
        this.presencePenalty = 0.0;

        // 날짜 형식 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedDateTime = createdDate.format(formatter);

        this.messages = new ArrayList<>();
        // default system messages
        this.messages.add(new Message("system", "DateTime information: " + formattedDateTime + "Find 'todo', 'date' and 'time' in content." +
                "And calculate the date user talking about based on 'DateTime information'. Return 'todo' in String type, 'date' in YYYY-MM-DD format, and 'time' in HH:MM format." +
                "If there is no 'todo' or 'time' information in content, return null. and if there is no 'date' information in content, return dateTimeInfo in YYYY.MM.DD format."  +
                "answer only in json type. json"));
        // add user prompt
        this.messages.add(new Message("user", content));
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
