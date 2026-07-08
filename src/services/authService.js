import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================
// Register
// ======================

export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);

  localStorage.setItem("token", data.data.token);

  return data;
};

// ======================
// Login
// ======================

export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);

  localStorage.setItem("token", data.data.token);

  return data;
};

// ======================
// Current User
// ======================

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const { data } = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ======================
// Logout
// ======================

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ======================
// Forgot Password
// ======================

export const forgotPassword = async (email) => {
  const { data } = await API.post("/auth/forgot-password", {
    email,
  });

  return data;
};

// ======================
// Reset Password
// ======================

export const resetPassword = async (token, password) => {
  const { data } = await API.put(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return data;
};