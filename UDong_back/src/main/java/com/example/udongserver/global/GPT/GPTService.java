// GPTService.java
package com.example.udongserver.global.GPT;

import com.example.udongserver.domain.chat.Chat;
import com.example.udongserver.domain.chat.ChatRepository;
import com.example.udongserver.global.GPT.DTO.GPTRequest;
import com.example.udongserver.global.GPT.DTO.GPTResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
@Slf4j
public class GPTService {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private final RestTemplate restTemplate;

    @Autowired
    private final ChatRepository chatRepository;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    public ResponseEntity<?> invokeGPTRequest(Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new IllegalArgumentException("Message with ID " + chatId + " not found. "));

        log.info("--------------------------GPT API------------------------------");
        log.info("Model: {}", model);
        log.info("DateTimeInfo: {}", chat.getTime());
        log.info("Content: {}", chat.getMessage());

        // DateTimeInfo가 null 인지 확인
        if(chat.getTime() == null) {
            log.error("createdDate is null");
            return new ResponseEntity<>("createdDate is null", HttpStatus.BAD_REQUEST);
        }

        // create a request
        GPTRequest request = new GPTRequest(model, chat.getTime(), chat.getMessage());

        GPTResponse response;
        try{
            response = restTemplate.postForObject(
                    apiUrl,
                    request,
                    GPTResponse.class
            );
        } catch (Exception e) {
            log.error("Error calling GPT API: {}", e.getMessage());
            return new ResponseEntity<>("Error calling GPT API", HttpStatus.BAD_REQUEST);
        }

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return new ResponseEntity<>("No response", HttpStatus.BAD_REQUEST);
        }

        // return the first response
        return new ResponseEntity<>(response.getChoices().get(0).getMessage().getContent(), HttpStatus.OK);

    }
}