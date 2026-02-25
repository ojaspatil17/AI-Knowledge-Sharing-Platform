package com.ojas.knowledgeplatform.controller;

import com.ojas.knowledgeplatform.entity.Article;
import com.ojas.knowledgeplatform.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    // ===============================
    // CREATE (Protected)
    // ===============================
    @PostMapping
    public Article createArticle(@RequestBody Article article,
                                 Authentication authentication) {

        return articleService.createArticle(
                article,
                authentication.getName()
        );
    }

    // ===============================
    // READ ALL (Public)
    // ===============================
    @GetMapping("/public")
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    // ===============================
    // READ BY ID (Public)
    // ===============================
    @GetMapping("/public/{id}")
    public Article getById(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

    // ===============================
    // MY ARTICLES (Protected)
    // ===============================
    @GetMapping("/my")
    public List<Article> getMyArticles(Authentication authentication) {
        return articleService.getArticlesByUser(authentication.getName());
    }

    // ===============================
    // 🔥 Combined Search (Title + Content + Tags)
    // ===============================
    @GetMapping("/public/search")
    public List<Article> searchArticles(@RequestParam String keyword) {
        return articleService.searchArticles(keyword);
    }

    // ===============================
    // Filter by Category (Public)
    // ===============================
    @GetMapping("/public/filter")
    public List<Article> filterByCategory(@RequestParam String category) {
        return articleService.filterByCategory(category);
    }

    // ===============================
    // UPDATE (Protected)
    // ===============================
    @PutMapping("/{id}")
    public Article updateArticle(@PathVariable Long id,
                                 @RequestBody Article article,
                                 Authentication authentication) {

        return articleService.updateArticle(
                id,
                article,
                authentication.getName()
        );
    }

    // ===============================
    // DELETE (Protected)
    // ===============================
    @DeleteMapping("/{id}")
    public String deleteArticle(@PathVariable Long id,
                                Authentication authentication) {

        articleService.deleteArticle(id, authentication.getName());
        return "Article deleted successfully";
    }
}