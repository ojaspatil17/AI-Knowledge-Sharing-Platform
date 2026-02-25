
# 🚀 Knowledge Sharing Platform – Backend

### 🤖 AI-Powered Secure Content Management System

---

## 📌 Project Overview

This backend powers an AI-enhanced Knowledge Sharing Platform built using **Spring Boot, JWT security, and Local LLM integration (Ollama - gemma:2b).**

The system enables:

* Secure article publishing
* AI-assisted content improvement
* Automatic summary generation
* Intelligent tag suggestions
* Advanced search & filtering

The architecture follows production-ready principles including:

* Stateless authentication
* Layered separation
* Centralized exception handling
* Ownership validation
* Secure password encryption

---

# 🛠 Tech Stack

* **Language:** Java 17
* **Framework:** Spring Boot 3.x
* **Security:** Spring Security + JWT
* **ORM:** Spring Data JPA (Hibernate)
* **Database:** MySQL
* **AI Integration:** Ollama (gemma:2b Local LLM)
* **Utilities:** Lombok

---

# 🏗 System Architecture

The backend follows a clean layered architecture:

Controller → Service → Repository → Database

---

## 📂 Package Structure

* `controller` → REST APIs
* `service` → Business logic
* `repository` → Data access layer
* `entity` → JPA entities
* `security` → JWT & authentication logic
* `dto` → Request/Response models
* `exception` → Global exception handling
* `config` → Security & CORS configuration

---

## 🎯 Why This Architecture?

* Clear separation of concerns
* Easier maintenance & debugging
* Scalable for production systems
* AI layer easily replaceable

---

# 🔐 Authentication & Authorization

Authentication is implemented using **JWT (JSON Web Token)** in a fully stateless manner.

---

## 🔁 Authentication Flow

1. User registers (password encrypted using BCrypt).
2. User logs in using **Email + Password**.
3. AuthenticationManager validates credentials.
4. JWT token is generated.
5. Token is returned to frontend.
6. Frontend sends token in:

   `Authorization: Bearer <token>`
7. JwtAuthenticationFilter validates token for protected routes.

---

## 🔒 Security Features

* Stateless session management
* Custom JWT filter
* Ownership validation (edit/delete restricted to author)
* Secure password hashing (BCrypt)
* Explicit CORS configuration
* Clear separation of public and protected endpoints

---

# 📝 Core Features

## 📚 Article Management

* Create article
* Edit article (author only)
* Delete article (author only)
* View all public articles
* View single article
* View user’s own articles

---

## 🤖 AI-Powered Capabilities

* Improve article content using LLM
* Auto-generate summary on article creation
* Suggest relevant tags
* Improve stored article via article ID

---

## 🔍 Search & Filtering

* Search by title
* Search by content
* Search by tags
* Filter by category
* Optimized combined search query

---

## 🏷 Tag System

* Many-to-Many relationship
* Prevents duplication
* Normalized database design
* Efficient querying

---

# 🤖 AI Integration Design

AI functionality is abstracted inside `AIService`.

### Why This Design?

* Easily switch from Ollama → OpenAI → any LLM
* Keeps controller clean
* Centralizes AI prompts
* Improves maintainability

---

## Implemented AI Endpoints

* `POST /api/ai/improve` → Improve raw text
* `POST /api/ai/summary` → Generate summary
* `POST /api/ai/suggest-tags` → Suggest relevant tags
* `POST /api/ai/improve/{id}` → Improve stored article

---

# ⚠ Exception Handling

A centralized `GlobalExceptionHandler` ensures:

* Structured JSON error responses
* Consistent API behavior
* Clean error mapping

### Handled Exceptions

* ResourceNotFoundException
* UnauthorizedActionException
* Generic runtime exceptions

Example Error Response:

```json
{
  "timestamp": "...",
  "message": "Article not found",
  "status": 404
}
```

---

# 🔍 Key Design Decisions

### ✅ Email-Based Authentication

Implemented as per assignment requirement.

### ✅ Stateless JWT

No server-side session storage.

### ✅ Ownership Validation

Users cannot modify others’ content.

### ✅ Many-to-Many Tags

Prevents duplication and maintains normalization.

### ✅ AI Layer Abstraction

AI logic separated from controller layer.

### ✅ Proper CORS Configuration

Resolved preflight and frontend integration issues.

---

# 🔧 Setup Instructions

## ✅ Prerequisites

* Java 17
* Maven
* MySQL
* Ollama (if using local LLM)

---

## 1️⃣ Database Setup

```sql
CREATE DATABASE knowledge_platform;
```

---

## 2️⃣ Configure `application.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/knowledge_platform
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

---

## 3️⃣ Run Application

```bash
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

# 🧪 API Usage Example

### Login

```
POST /api/auth/login
```

### Access Protected Endpoint

```
GET /api/articles/my
Authorization: Bearer <JWT_TOKEN>
```

---

# 🤖 AI Usage Transparency

AI tools were used for:

* Initial boilerplate generation
* Refactoring suggestions
* Structuring layered architecture
* Debugging JWT and CORS issues

Manual refinement was done for:

* Security configuration
* JWT filter implementation
* Ownership validation
* Search query optimization
* Exception handling design
* Tag normalization
* API testing & validation

All AI-generated suggestions were reviewed and manually validated.

---

# 📊 Evaluation Highlights

This project demonstrates:

* Secure authentication implementation
* Clean layered architecture
* AI-assisted functionality
* Proper exception handling
* Database normalization
* Ownership validation
* Production-style backend structure

---

# 🚀 Future Enhancements

* Role-based access control (Admin/User)
* Pagination
* Rate limiting
* Caching layer
* AI moderation
* Elasticsearch integration

---

# 👨‍💻 Developer Capability Demonstrated

* Strong understanding of Spring Security
* Proper JWT implementation
* Clean backend architecture
* Secure API development
* LLM integration strategy
* Interview-defendable implementation

---
