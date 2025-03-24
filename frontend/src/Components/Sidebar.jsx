import { Link } from "react-router-dom";
import { Home, UserPlus, Bell, Trophy } from "lucide-react";

export default function Sidebar({ user }) {
  return (
    <div style={{ backgroundColor: "#E5D9F2", borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <div
          style={{
            height: "4rem",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          }}
        />
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              margin: "0 auto",
              marginTop: "-2.5rem",
            }}
          />
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "0.5rem", color: "#120D31" }}>
            {user.name}
          </h2>
        </Link>
        <p style={{ color: "#302F4D" }}>{user.headline}</p>
        <p style={{ color: "#302F4D", fontSize: "0.75rem" }}>{user.connections.length} connections</p>
      </div>
      <div style={{ borderTop: "1px solid #B98EA7", padding: "1rem" }}>
        <nav>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "#302F4D",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#302F4D";
                  e.currentTarget.style.color = "#F0D3F7";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#302F4D";
                }}
              >
                <Home style={{ marginRight: "0.5rem" }} size={20} /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/network"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "#302F4D",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#302F4D";
                  e.currentTarget.style.color = "#F0D3F7";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#302F4D";
                }}
              >
                <UserPlus style={{ marginRight: "0.5rem" }} size={20} /> My Network
              </Link>
            </li>
            <li>
              <Link
                to="/leagues"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "#302F4D",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#302F4D";
                  e.currentTarget.style.color = "#F0D3F7";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#302F4D";
                }}
              >
                <Trophy style={{ marginRight: "0.5rem" }} size={20} /> Leagues & Clubs
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "#302F4D",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#302F4D";
                  e.currentTarget.style.color = "#F0D3F7";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#302F4D";
                }}
              >
                <Bell style={{ marginRight: "0.5rem" }} size={20} /> Notifications
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ borderTop: "1px solid #B98EA7", padding: "1rem" }}>
        <Link
          to={`/profile/${user.username}`}
          style={{ fontSize: "0.875rem", fontWeight: "600", color: "#302F4D" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#A57982")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#302F4D")}
        >
          Visit your profile
        </Link>
      </div>
    </div>
  );
}