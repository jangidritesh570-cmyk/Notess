import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError("Please enter your email.");
    }

    try {
      setLoading(true);
      setError("");

      const res = await forgotPassword(email);

      setMessage(res.message || "Reset email sent successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong"
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
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "420px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 12px 25px rgba(0,0,0,.12)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#000",
            marginBottom: "25px",
          }}
        >
          Forgot Password
        </h2>

        {message && (
          <div
            style={{
              background: "#e7f9ed",
              color: "#0f8a35",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#ffe5e5",
              color: "#d8000c",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        <label>Email Address</label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "20px",
          }}
        >
          <FaEnvelope />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              marginLeft: "10px",
            }}
          />
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
          }}
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <FaPaperPlane /> Send Reset Link
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
          Remember Password?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}