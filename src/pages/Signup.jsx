import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { registerUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("Please fill all fields.");
    }

    if (formData.password.length < 6) {
      return setError(
        "Password must be at least 6 characters."
      );
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
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
        background: "#f4f7fc",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "430px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0,0,0,.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#000",
          }}
        >
          Create Account
        </h1>

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              color: "#d8000c",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* Name */}

        <div style={{ marginBottom: "18px" }}>
          <label>Full Name</label>

          <div
            style={{
  flex: 1,
  border: "none",
  outline: "none",
  marginLeft: "10px",
  fontSize: "16px",
}}
          >
            <FaUser />

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                marginLeft: "10px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>

        {/* Email */}

        <div style={{ marginBottom: "18px" }}>
          <label>Email</label>

          <div
            style={{
  flex: 1,
  border: "none",
  outline: "none",
  marginLeft: "10px",
  fontSize: "16px",
}}
          >
            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                marginLeft: "10px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>

        {/* Password */}

        <div style={{ marginBottom: "18px" }}>
          <label>Password</label>

          <div
            style={{
  flex: 1,
  border: "none",
  outline: "none",
  marginLeft: "10px",
  fontSize: "16px",
}}
          >
            <FaLock />

            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                marginLeft: "10px",
                fontSize: "16px",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
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

        {/* Confirm Password */}

        <div style={{ marginBottom: "25px" }}>
          <label>Confirm Password</label>

          <div
            style={{
  flex: 1,
  border: "none",
  outline: "none",
  marginLeft: "10px",
  fontSize: "16px",
}}
          >
            <FaLock />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                marginLeft: "10px",
                fontSize: "16px",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#666",
                fontSize: "18px",
              }}
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

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
            "Creating Account..."
          ) : (
            <>
              <FaUserPlus /> Sign Up
            </>
          )}
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#000",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}