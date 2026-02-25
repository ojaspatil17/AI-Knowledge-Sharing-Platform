
# 🚀 Knowledge Sharing Platform – Frontend

### ⚛️ AI-Integrated React Client Application

---

## 📌 Project Overview

This frontend is the client-side application for the **AI-Powered Knowledge Sharing Platform**.

Built using **React (Vite)**, it communicates with a secure Spring Boot backend via REST APIs and integrates JWT-based authentication.

The frontend enables:

* User authentication (Signup / Login)
* Article creation and editing
* AI-assisted content improvement
* Article search and filtering
* Protected routes using JWT
* Clean and simple user interface

The application follows modern frontend architecture practices with context-based authentication and centralized API configuration.

---

# 🛠 Tech Stack

* **Framework:** React (Vite)
* **Language:** JavaScript (ES6+)
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **State Management:** React Context API
* **Authentication:** JWT (stored in localStorage)
* **Editor:** Textarea (AI-assisted improvement)
* **Build Tool:** Vite

---

# 🏗 Frontend Architecture

The frontend follows a modular component structure:

Components → Pages → API Layer → Backend

---

## 📂 Folder Structure

```
src/
 ├── api/
 │     └── axios.js
 ├── context/
 │     └── AuthContext.jsx
 ├── pages/
 │     ├── Home.jsx
 │     ├── Login.jsx
 │     ├── Signup.jsx
 │     ├── CreateArticle.jsx
 │     ├── EditArticle.jsx
 │     ├── ArticleDetail.jsx
 │     └── MyArticles.jsx
 ├── App.jsx
 └── main.jsx
```

---

# 🔐 Authentication System

Authentication is handled using JWT tokens.

---

## 🔁 Login Flow

1. User enters Email + Password.
2. Request sent to:

   ```
   POST /api/auth/login
   ```
3. Backend validates credentials.
4. JWT token returned.
5. Token stored in `localStorage`.
6. Axios automatically attaches:

   ```
   Authorization: Bearer <token>
   ```
7. Protected endpoints become accessible.

---

## 🔒 Protected Route Handling

* Token stored inside `AuthContext`
* Axios default headers updated dynamically
* Unauthorized access prevented
* Auto-redirect after successful login

---

# 📝 Core Features

## 🏠 Home Page

* Displays all public articles
* Search by keyword
* Filter by category
* Clickable article titles
* Summary preview

---

## 📄 Article Detail Page

* Full article view
* Displays category, author, timestamp
* Clean content rendering

---

## ✍ Create Article Page

* Title input
* Category input
* Tags (comma-separated)
* Content textarea
* AI Improve button
* Submit article

---

## 🛠 Edit Article Page

* Load article by ID
* Update title, category, content
* Submit changes
* Redirect after update

---

## 📚 My Articles Page

* Fetch logged-in user articles
* Edit option
* Delete option
* Ownership-based access

---

# 🤖 AI Integration (Frontend Side)

The frontend integrates with backend AI endpoints.

### Implemented AI Actions

* Improve raw content before publishing
* Auto-summary (handled by backend on creation)
* AI improve stored article by ID

### Improve Flow

1. User writes content.
2. Clicks **"Improve with AI"**.
3. Request sent to:

   ```
   POST /api/ai/improve
   ```
4. Improved content replaces textarea value.

---

# 🌐 API Communication

Axios is configured centrally.

## axios.js

* Base URL configured
* Authorization header auto-attached
* CORS compatible
* Error logging centralized

---

# 🔧 Setup Instructions

## ✅ Prerequisites

* Node.js (v18+ recommended)
* Backend running at `http://localhost:8080`

---

## 1️⃣ Install Dependencies

```
npm install
```

---

## 2️⃣ Run Development Server

```
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

# 🔗 Backend Connection

Ensure backend is running on:

```
http://localhost:8080
```

If needed, update Axios base URL inside:

```
src/api/axios.js
```

---

# 🔎 Error Handling Strategy

* Login error messages displayed
* API failures logged in console
* Protected endpoint errors handled
* CORS issues resolved via backend configuration

---

# 🎯 Key Design Decisions

### ✅ Context API Instead of Redux

Lightweight authentication state management.

### ✅ Centralized Axios Configuration

Avoids repetition and ensures consistent headers.

### ✅ Stateless Authentication

Frontend does not manage sessions manually.

### ✅ Clean Navigation Flow

Auto-redirect after login and article actions.

### ✅ Minimalistic UI

Focus on functionality and clarity.

---

# 📊 Evaluation Highlights

This frontend demonstrates:

* Proper JWT integration
* Clean React architecture
* Secure API communication
* AI-assisted UI functionality
* Search and filtering implementation
* Ownership-based editing
* Clean navigation and routing

---

# 🚀 Future Improvements

* Rich Text Editor (Quill / TipTap)
* Dark mode UI
* Pagination
* Loading spinners
* Toast notifications
* Role-based UI rendering
* Better UI styling (Tailwind / Material UI)
* Article bookmarking

---

# 👨‍💻 Developer Capabilities Demonstrated

* React routing mastery
* Context-based authentication
* Secure JWT handling
* REST API integration
* AI-assisted content workflow
* Clean state management
* Full-stack system understanding

---
