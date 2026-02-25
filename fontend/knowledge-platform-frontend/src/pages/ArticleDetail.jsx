import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    const res = await api.get(`/articles/public/${id}`);
    setArticle(res.data);
  };

  if (!article) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div style={cardStyle}>
        <h2>{article.title}</h2>

        <p><strong>Category:</strong> {article.category}</p>
        <p><strong>Author:</strong> {article.author?.username}</p>

        <hr />

        <div style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
          {article.content}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

export default ArticleDetail;