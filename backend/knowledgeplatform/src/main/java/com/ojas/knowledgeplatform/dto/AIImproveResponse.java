package com.ojas.knowledgeplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AIImproveResponse {

    private String originalContent;
    private String improvedContent;
}