import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const res = await api.get("/articles/my");
    setArticles(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/articles/${id}`);
    loadArticles();
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ color: "white" }}>My Articles</h2>

      {articles.map(article => (
        <div key={article.id} style={cardStyle}>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>

          <button onClick={() => navigate(`/edit/${article.id}`)} style={{ marginRight: "10px" }}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(article.id)}
            style={{ background: "#d9534f" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
};

export default MyArticles;