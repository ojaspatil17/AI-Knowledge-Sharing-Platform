import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "rgba(0,0,0,0.85)",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Knowledge Platform
        </Link>
      </div>

      <div>
        <Link style={linkStyle} to="/create">Create</Link>
        <Link style={linkStyle} to="/my">My Articles</Link>
        <Link style={linkStyle} to="/login">Login</Link>
        <Link style={linkStyle} to="/signup">Signup</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  marginLeft: "20px",
  textDecoration: "none",
  fontWeight: "500"
};

export default Navbar;