import { Link, useNavigate } from "react-router-dom";
import {
  FaStickyNote,
  FaPlus,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import { logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <FaStickyNote className="logo-icon" />
          <span>Notes App</span>
        </Link>

        {/* Right Side */}
        <div
          className="navbar-actions"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {user ? (
            <>
              <span
                style={{
                  fontWeight: "600",
                  color: "#2563eb",
                }}
              >
                👋 {user.name}
              </span>

              <Link to="/create" className="add-btn">
                <FaPlus />
                <span>New Note</span>
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "600",
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#2563eb",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/signup"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "600",
                }}
              >
                <FaUserPlus />
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;