# 🚀 AI-Powered Knowledge Sharing Platform

A full-stack AI-enabled Knowledge Sharing Platform built using **Spring Boot, React, JWT authentication, MySQL, and Local LLM integration (Ollama – gemma:2b).**

This project demonstrates secure backend architecture, stateless authentication, AI-assisted content processing, and modern React frontend integration.

---

# 📌 Project Overview

The platform allows users to:

- Register and Login securely using JWT
- Create, edit, and delete articles (with ownership validation)
- Search articles by title, content, and tags
- Filter articles by category
- Improve content using AI
- Automatically generate summaries
- Suggest intelligent tags using LLM

The system follows clean architecture principles and stateless security best practices.

---

# 🛠 Tech Stack

## 🔹 Backend
- Java 17
- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA (Hibernate)
- MySQL
- Lombok
- Ollama (gemma:2b Local LLM)

## 🔹 Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API
- JWT stored in localStorage

---

# 🏗 System Architecture

## Backend Architecture

Controller → Service → Repository → Database


- Stateless authentication
- Global exception handling
- Ownership validation
- Many-to-Many tag mapping
- AI service abstraction

## Frontend Architecture

Components → Pages → Axios API Layer → Backend


- Centralized AuthContext
- Auto Authorization header injection
- Protected route handling

---

# 🔐 Authentication Flow

1. User registers (password encrypted using BCrypt).
2. User logs in using Email + Password.
3. Spring Security authenticates credentials.
4. JWT token is generated.
5. Token returned to frontend.
6. Token stored in `localStorage`.
7. Axios automatically attaches:


Authorization: Bearer <token>


8. JWT filter validates token for protected endpoints.

---

# ✨ Core Features

## 📚 Article Management
- Create article
- Edit article (author only)
- Delete article (author only)
- View all articles
- View article by ID
- View logged-in user's articles

## 🔍 Search & Filtering
- Search by title
- Search by content
- Search by tags
- Filter by category
- Combined optimized query

## 🏷 Tag System
- Many-to-Many relationship
- Prevents duplication
- Normalized database structure

## 🤖 AI Capabilities
- Improve raw article content
- Auto-generate summary on creation
- Suggest relevant tags
- Improve stored article by ID

AI functionality is abstracted inside `AIService` for easy replacement or scaling.

---

# 🗄 Database Design

## Tables
- `users`
- `articles`
- `tags`
- `article_tags` (Join table)

Key design principles:
- Normalization
- Foreign key constraints
- Ownership validation
- Optimized search queries

---

# ⚙ Setup Instructions

---

## 🔹 Prerequisites

- Java 17
- Maven
- Node.js (v18+ recommended)
- MySQL
- Ollama (for AI features)

---

# 🛠 Backend Setup

### 1️⃣ Create Database

``sql
CREATE DATABASE knowledge_platform;

###2️⃣ Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/knowledge_platform
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

###3️⃣ Run Backend
mvn spring-boot:run

Backend runs at: http://localhost:8080

🌐 Frontend Setup
1️⃣ Navigate to frontend folder
cd frontend
2️⃣ Install dependencies
npm install
3️⃣ Run development server
npm run dev

Frontend runs at: http://localhost:5173

Ensure backend is running before using frontend.

🤖 AI Setup Instructions
1️⃣ Install Ollama

Download from:
https://ollama.com

2️⃣ Pull gemma:2b model
ollama pull gemma:2b
3️⃣ Start Ollama service
ollama run gemma:2b

Ensure backend AIService points to:

http://localhost:11434
🧪 Example API Usage
Login
POST /api/auth/login
Access Protected Endpoint
GET /api/articles/my
Authorization: Bearer <JWT_TOKEN>
⚠ Error Handling

Global exception handling ensures structured JSON responses:

{
  "timestamp": "...",
  "message": "Article not found",
  "status": 404
}
🚀 Future Enhancements

Role-based access control
Pagination
Redis caching
Rate limiting
Elasticsearch integration
Rich text editor integration
UI improvements

📊 Project Strengths

Secure JWT authentication
Clean layered backend architecture
AI integration using local LLM
Proper ownership validation
Many-to-Many relational modeling
Centralized error handling
Full-stack integration

👨‍💻 Developer Capabilities Demonstrated

Strong understanding of Spring Security internals
Proper JWT filter implementation
REST API design
React authentication flow
AI integration strategy
Clean production-style architecture
Interview-defendable full-stack implementation


Updated professional full-stack project README
