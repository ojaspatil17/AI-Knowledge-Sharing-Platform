package com.ojas.knowledgeplatform.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ojas.knowledgeplatform.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String OLLAMA_URL = "http://localhost:11434/api/generate";
    private static final String MODEL = "gemma:2b";

    @Override
    public String improveWriting(String content) {
        String prompt = "Improve the grammar and clarity of the following text:\n" + content;
        return callOllama(prompt);
    }

    @Override
    public String generateSummary(String content) {
        String prompt = "Generate a short 2-3 line summary of the following article:\n" + content;
        return callOllama(prompt);
    }

    private String callOllama(String prompt) {

        try {

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", MODEL);
            requestBody.put("prompt", prompt);
            requestBody.put("stream", false);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(OLLAMA_URL, request, String.class);

            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            return jsonNode.get("response").asText();

        } catch (Exception e) {
            return "AI Error: " + e.getMessage();
        }
    }
}