import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { resetPassword } from "../services/authService";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return setError("Please fill all fields.");
    }

    if (password.length < 6) {
      return setError(
        "Password must be at least 6 characters."
      );
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      setError("");

      const res = await resetPassword(
        token,
        password
      );

      setSuccess(
        res.message ||
          "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Reset failed"
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
          width: "430px",
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
          Reset Password
        </h2>

        {success && (
          <div
            style={{
              background: "#e7f9ed",
              color: "#0f8a35",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          >
            {success}
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

        <label>New Password</label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "18px",
          }}
        >
          <FaLock />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter new password"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              marginLeft: "10px",
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
            }}
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        <label>Confirm Password</label>

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
          <FaLock />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Confirm password"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              marginLeft: "10px",
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
            }}
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
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
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}