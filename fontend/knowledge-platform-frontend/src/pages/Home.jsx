import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Home() {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await api.get("/articles/public");
    setArticles(response.data);
  };

  const handleSearch = async () => {
    if (!keyword) {
      fetchArticles();
      return;
    }

    const response = await api.get(
      `/articles/public/search?keyword=${keyword}`
    );
    setArticles(response.data);
  };

  const handleFilter = async (selectedCategory) => {
    setCategory(selectedCategory);

    if (!selectedCategory) {
      fetchArticles();
      return;
    }

    const response = await api.get(
      `/articles/public/filter?category=${selectedCategory}`
    );
    setArticles(response.data);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "white" }}>All Articles</h2>

      <div style={cardStyle}>
        <input
          style={inputStyle}
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <select
          style={{ ...inputStyle, marginTop: "10px" }}
          value={category}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="AI">AI</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>

      {articles.map((article) => (
        <div key={article.id} style={cardStyle}>
          <h3>
            <Link to={`/article/${article.id}`}>
              {article.title}
            </Link>
          </h3>

          <p><strong>Category:</strong> {article.category}</p>
          <p><strong>Author:</strong> {article.author?.username}</p>

          <p>
            <strong>Tags:</strong>{" "}
            {article.tags?.length > 0
              ? article.tags.map((t) => t.name).join(", ")
              : "No tags"}
          </p>

          <p>{article.summary}</p>

          <small style={{ color: "gray" }}>
            {new Date(article.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  maxWidth: "1000px",
  margin: "auto"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px"
};

export default Home;