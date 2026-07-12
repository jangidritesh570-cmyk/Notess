import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("Please fill all fields.");
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#000",
          }}
        >
          Login
        </h1>

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              color: "#d8000c",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Email */}

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              color: "#000",
              fontWeight: "500",
            }}
          >
            Email
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          >
            <FaEnvelope color="#666" />

            <input
  type="email"
  name="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
  style={{
    border: "none",
    outline: "none",
    marginLeft: "10px",
    width: "100%",
    fontSize: "16px",   // <-- 15 se 16
  }}
/>
          </div>
        </div>

        {/* Password */}

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              color: "#000",
              fontWeight: "500",
            }}
          >
            Password
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          >
            <FaLock color="#666" />

            <input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  style={{
    border: "none",
    outline: "none",
    marginLeft: "10px",
    flex: 1,
    fontSize: "16px",   // <-- 16
  }}
/>

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "#666",
                fontSize: "18px",
              }}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <FaSignInAlt /> Login
            </>
          )}
        </button>

        {/* Register */}

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#000",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}