package com.ojas.knowledgeplatform.service;

import com.ojas.knowledgeplatform.entity.Article;
import java.util.List;

public interface ArticleService {

    Article createArticle(Article article, String username);

    List<Article> getAllArticles();

    Article getArticleById(Long id);

    List<Article> getArticlesByUser(String username);

    Article updateArticle(Long id, Article updatedArticle, String username);

    void deleteArticle(Long id, String username);

    // 🔥 Combined search (Title + Content + Tags)
    List<Article> searchArticles(String keyword);

    List<Article> filterByCategory(String category);
}