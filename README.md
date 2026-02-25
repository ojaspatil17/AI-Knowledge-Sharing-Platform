
# 🚀 AI-Powered Knowledge Sharing Platform

A full-stack AI-enabled Knowledge Sharing Platform built using **Spring Boot, React (Vite), JWT authentication, MySQL, and Local LLM integration (Ollama – gemma:2b).**

This project demonstrates secure backend architecture, stateless authentication, AI-assisted content processing, and modern React frontend integration.

---

# 📌 Project Overview

The platform allows users to:

* Register and login securely using JWT
* Create, edit, and delete articles (with ownership validation)
* Search articles by title, content, and tags
* Filter articles by category
* Improve content using AI
* Auto-generate summaries
* Suggest relevant tags using LLM

This system is designed using production-ready backend practices and modular frontend architecture.

---

# 🛠 Tech Stack

## 🔙 Backend

* Java 17
* Spring Boot 3.x
* Spring Security + JWT
* Spring Data JPA (Hibernate)
* MySQL
* Ollama (gemma:2b Local LLM)
* Lombok

## ⚛ Frontend

* React (Vite)
* JavaScript (ES6+)
* React Router DOM
* Axios
* Context API (Authentication)
* JWT (localStorage)

## 🗄 Database

* MySQL
* Normalized schema
* Many-to-Many relationship (Articles ↔ Tags)

---

# ✨ Key Features

### 🔐 Secure Authentication

* Stateless JWT implementation
* BCrypt password encryption
* Protected API endpoints
* Ownership-based article editing

### 📝 Article Management

* Create / Edit / Delete articles
* View all public articles
* View user-specific articles
* Tag-based categorization

### 🔍 Search & Filtering

* Search by keyword
* Filter by category
* Tag-based filtering

### 🤖 AI Capabilities

* Improve article content
* Auto-generate summaries
* Suggest tags
* Improve stored article by ID

---

# 📂 Project Structure

``
AI-Knowledge-Sharing-Platform/
│
├── backend/knowledgeplatform
│     └── Spring Boot application
│
├── frontend/knowledge-platform-frontend
│     └── React (Vite) application
│
├── database
│     └── schema.sql
│
└── README.md
`

---

# ⚙️ How To Run The Project

---

## 🗄 Step 1: Database Setup

1. Open MySQL
2. Create database:

``sql
CREATE DATABASE knowledge_platform;


3. (Optional) Import:  database/schema.sql
``

---

## 🔙 Step 2: Run Backend

Navigate to: backend/knowledgeplatform


Configure  : application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/knowledge_platform
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update


Run:  mvn spring-boot:run

Backend runs at:  http://localhost:8080

## ⚛ Step 3: Run Frontend

Navigate to:  frontend/knowledge-platform-frontend


Install dependencies:   npm install

Run development server:  npm run dev

Frontend runs at:   http://localhost:5173

---

# 🤖 AI Setup (Ollama – gemma:2b)

1. Install Ollama
2. Pull model:   ollama pull gemma:2b

3. Ensure Ollama is running locally:  http://localhost:11434

The backend AIService connects to this endpoint.

---

# 🔐 Authentication Flow (High-Level)

1. User logs in.
2. Backend validates credentials.
3. JWT token is generated.
4. Token stored in frontend localStorage.
5. Axios sends:

Authorization: Bearer <token>

6. Backend JWT filter validates request.

---

# 📊 What This Project Demonstrates

* Clean layered backend architecture
* Proper JWT security implementation
* Ownership validation
* Database normalization
* AI integration abstraction layer
* React Context-based authentication
* Secure REST API communication
* Full-stack integration capability

---

# 🚀 Future Improvements

* Role-based access control
* Pagination
* Rich text editor (Quill / TipTap)
* Caching layer
* Elasticsearch integration
* AI moderation
* UI enhancement with Tailwind or Material UI

---

# 👨‍💻 Developer Capability Demonstrated

* Spring Security mastery
* Stateless JWT implementation
* Secure API design
* React authentication flow
* AI integration strategy
* Production-style project structuring
* Full-stack system design

