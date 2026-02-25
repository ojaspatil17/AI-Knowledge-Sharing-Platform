import { Routes, Route } from "react-router-dom";
import "./App.css";

import ArticleDetail from "./pages/ArticleDetail";
import MyArticles from "./pages/MyArticles";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/my" element={<MyArticles />} />
          <Route path="/edit/:id" element={<EditArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;