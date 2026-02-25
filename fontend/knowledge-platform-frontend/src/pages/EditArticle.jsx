import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [improving, setImproving] = useState(false);
  const [suggestingTags, setSuggestingTags] = useState(false);

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    const res = await api.get(`/articles/public/${id}`);
    const article = res.data;

    setTitle(article.title);
    setCategory(article.category);
    setContent(article.content);
    setTags(article.tags?.map(t => t.name).join(", "));
  };

  const handleImprove = async () => {
    if (!content.trim()) return;
    setImproving(true);
    const res = await api.post("/ai/improve", content, {
      headers: { "Content-Type": "text/plain" },
    });
    setContent(res.data);
    setImproving(false);
  };

  const handleSuggestTags = async () => {
    if (!content.trim()) return;
    setSuggestingTags(true);
    const res = await api.post("/ai/suggest-tags", content, {
      headers: { "Content-Type": "text/plain" },
    });
    if (Array.isArray(res.data)) {
      setTags(res.data.join(", "));
    }
    setSuggestingTags(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "")
      .map((t) => ({ name: t }));

    await api.put(`/articles/${id}`, {
      title,
      category,
      content,
      tags: tagArray,
    });

    navigate("/my");
  };

  return (
    <div style={centerContainer}>
      <div style={cardStyle}>
        <h2>Edit Article</h2>

        <form onSubmit={handleUpdate}>
          <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} />
          <input style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)} />
          <input style={inputStyle} value={tags} onChange={(e) => setTags(e.target.value)} />

          <textarea
            rows="8"
            style={inputStyle}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="button" onClick={handleImprove} disabled={improving}>
              {improving ? "Improving..." : "Improve"}
            </button>

            <button
              type="button"
              onClick={handleSuggestTags}
              disabled={suggestingTags}
              style={{ backgroundColor: "#555" }}
            >
              {suggestingTags ? "Suggesting..." : "Suggest Tags"}
            </button>

            <button type="submit" style={{ flex: 1 }}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const centerContainer = {
  display: "flex",
  justifyContent: "center",
  padding: "40px"
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "650px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

export default EditArticle;