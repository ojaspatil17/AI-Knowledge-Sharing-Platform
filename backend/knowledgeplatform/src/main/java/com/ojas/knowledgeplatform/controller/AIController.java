package com.ojas.knowledgeplatform.controller;

import com.ojas.knowledgeplatform.dto.AIImproveResponse;
import com.ojas.knowledgeplatform.entity.Article;
import com.ojas.knowledgeplatform.service.AIService;
import com.ojas.knowledgeplatform.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;
    private final ArticleService articleService;

    // 🔹 Improve raw text
    @PostMapping("/improve")
    public String improveWriting(@RequestBody String content) {
        return aiService.improveWriting(content);
    }

    // 🔹 Generate summary from raw text
    @PostMapping("/summary")
    public String generateSummary(@RequestBody String content) {
        return aiService.generateSummary(content);
    }

    // 🔥 Improve article by ID (safe, does not update DB)
    @PostMapping("/improve/{articleId}")
    public AIImproveResponse improveArticleById(@PathVariable Long articleId) {

        Article article = articleService.getArticleById(articleId);

        String improvedContent = aiService.improveWriting(article.getContent());

        return new AIImproveResponse(
                article.getContent(),
                improvedContent
        );
    }

    // 🔥 AI Tag Suggestion (Bonus Feature)
    @PostMapping("/suggest-tags")
    public List<String> suggestTags(@RequestBody String content) {

        String aiResponse = aiService.improveWriting(
                "Suggest 5 short relevant tags separated by commas for the following content:\n\n" + content
        );

        // Convert AI response into clean list
        return Arrays.stream(aiResponse.split(","))
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .collect(Collectors.toList());
    }
}