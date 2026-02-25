package com.ojas.knowledgeplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ojas.knowledgeplatform.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // 🔍 Search by title
    List<Article> findByTitleContainingIgnoreCase(String title);

    // 🔍 Search by content
    List<Article> findByContentContainingIgnoreCase(String content);

    // 🔍 Search by category
    List<Article> findByCategory(String category);

    // 🔍 Get articles by author
    List<Article> findByAuthorId(Long authorId);

    // 🔥 Search by tag name
    List<Article> findByTags_NameIgnoreCase(String tagName);

    // 🚀 Combined search (title OR content OR tag)
    List<Article> findDistinctByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrTags_NameIgnoreCase(
            String title,
            String content,
            String tagName
    );
}