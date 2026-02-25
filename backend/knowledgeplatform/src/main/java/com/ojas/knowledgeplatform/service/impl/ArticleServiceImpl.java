package com.ojas.knowledgeplatform.service.impl;

import com.ojas.knowledgeplatform.entity.Article;
import com.ojas.knowledgeplatform.entity.Tag;
import com.ojas.knowledgeplatform.entity.User;
import com.ojas.knowledgeplatform.exception.ResourceNotFoundException;
import com.ojas.knowledgeplatform.exception.UnauthorizedActionException;
import com.ojas.knowledgeplatform.repository.ArticleRepository;
import com.ojas.knowledgeplatform.repository.TagRepository;
import com.ojas.knowledgeplatform.repository.UserRepository;
import com.ojas.knowledgeplatform.service.AIService;
import com.ojas.knowledgeplatform.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final AIService aiService;
    private final TagRepository tagRepository;

    // ============================================================
    // CREATE ARTICLE
    // ============================================================
    @Override
    public Article createArticle(Article article, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        article.setAuthor(user);

        // 🔥 Proper Tag Handling (Fix for TransientObjectException)
        if (article.getTags() != null && !article.getTags().isEmpty()) {

            Set<Tag> savedTags = new HashSet<>();

            for (Tag tag : article.getTags()) {

                if (tag.getName() == null || tag.getName().trim().isEmpty()) {
                    continue;
                }

                String cleanedName = tag.getName().trim();

                Tag existingTag = tagRepository
                        .findByNameIgnoreCase(cleanedName)
                        .orElseGet(() ->
                                tagRepository.save(
                                        Tag.builder()
                                                .name(cleanedName)
                                                .build()
                                )
                        );

                savedTags.add(existingTag);
            }

            article.setTags(savedTags);
        }

        // AI Summary Generation
        String summary = aiService.generateSummary(article.getContent());
        article.setSummary(summary);

        return articleRepository.save(article);
    }

    // ============================================================
    // GET ALL
    // ============================================================
    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    // ============================================================
    // GET BY ID
    // ============================================================
    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
    }

    // ============================================================
    // GET USER ARTICLES
    // ============================================================
    @Override
    public List<Article> getArticlesByUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return articleRepository.findByAuthorId(user.getId());
    }

    // ============================================================
    // UPDATE ARTICLE
    // ============================================================
    @Override
    public Article updateArticle(Long id, Article updatedArticle, String email) {

        Article existingArticle = getArticleById(id);

        if (!existingArticle.getAuthor().getEmail().equals(email)) {
            throw new UnauthorizedActionException("You can update only your own articles");
        }

        existingArticle.setTitle(updatedArticle.getTitle());
        existingArticle.setContent(updatedArticle.getContent());
        existingArticle.setCategory(updatedArticle.getCategory());

        // 🔥 Proper Tag Handling on Update
        if (updatedArticle.getTags() != null) {

            Set<Tag> savedTags = new HashSet<>();

            for (Tag tag : updatedArticle.getTags()) {

                if (tag.getName() == null || tag.getName().trim().isEmpty()) {
                    continue;
                }

                String cleanedName = tag.getName().trim();

                Tag existingTag = tagRepository
                        .findByNameIgnoreCase(cleanedName)
                        .orElseGet(() ->
                                tagRepository.save(
                                        Tag.builder()
                                                .name(cleanedName)
                                                .build()
                                )
                        );

                savedTags.add(existingTag);
            }

            existingArticle.setTags(savedTags);
        }

        return articleRepository.save(existingArticle);
    }

    // ============================================================
    // SEARCH
    // ============================================================
    @Override
    public List<Article> searchArticles(String keyword) {

        return articleRepository
                .findDistinctByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrTags_NameIgnoreCase(
                        keyword,
                        keyword,
                        keyword
                );
    }

    // ============================================================
    // FILTER
    // ============================================================
    @Override
    public List<Article> filterByCategory(String category) {
        return articleRepository.findByCategory(category);
    }

    // ============================================================
    // DELETE
    // ============================================================
    @Override
    public void deleteArticle(Long id, String email) {

        Article article = getArticleById(id);

        if (!article.getAuthor().getEmail().equals(email)) {
            throw new UnauthorizedActionException("You can delete only your own articles");
        }

        articleRepository.delete(article);
    }
}