import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [improving, setImproving] = useState(false);
  const [suggestingTags, setSuggestingTags] = useState(false);
  const [error, setError] = useState("");

  // 🔹 AI Improve
  const handleImprove = async () => {
    if (!content.trim()) return;

    try {
      setImproving(true);
      setError("");

      const response = await api.post("/ai/improve", content, {
        headers: { "Content-Type": "text/plain" },
      });

      setContent(response.data);
    } catch (err) {
      setError("AI improve failed.");
    } finally {
      setImproving(false);
    }
  };

  // 🔹 AI Suggest Tags (SAFE VERSION)
  const handleSuggestTags = async () => {
    if (!content.trim()) return;

    try {
      setSuggestingTags(true);
      setError("");

      const response = await api.post("/ai/suggest-tags", content, {
        headers: { "Content-Type": "text/plain" },
      });

      // If backend returns array (correct case)
      if (Array.isArray(response.data)) {
        setTags(response.data.join(", "));
      }

      // If backend returns formatted text (LLM explanation case)
      else if (typeof response.data === "string") {
        const cleaned = response.data
          // Remove numbered lists like "1. Tag"
          .replace(/^\d+\.\s*/gm, "")
          // Remove unwanted explanation phrases
          .replace(/sure.*?:/i, "")
          .split("\n")
          .map((t) => t.trim())
          .filter((t) => t.length > 0 && t.length < 40)
          .join(", ");

        setTags(cleaned);
      }
    } catch (err) {
      setError("AI tag suggestion failed.");
    } finally {
      setSuggestingTags(false);
    }
  };

  // 🔹 Publish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && t.length < 50)
      .map((t) => ({ name: t }));

    try {
      await api.post("/articles", {
        title,
        category,
        content,
        tags: tagArray,
      });

      navigate("/");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create article.");
      }
    }
  };

  return (
    <div style={centerContainer}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Create Article</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            style={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            placeholder="Category"
            style={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            placeholder="Tags (comma separated)"
            style={inputStyle}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <textarea
            rows="8"
            placeholder="Write your article..."
            style={inputStyle}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div style={buttonRow}>
            <button type="button" onClick={handleImprove} disabled={improving}>
              {improving ? "Improving..." : "Improve with AI"}
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
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🔹 UI Styles
const centerContainer = {
  display: "flex",
  justifyContent: "center",
  padding: "40px",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "650px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

export default CreateArticle;