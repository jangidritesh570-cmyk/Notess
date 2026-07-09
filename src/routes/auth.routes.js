import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ===============================
// Public Routes
// ===============================

// Register User
// POST /api/auth/register
router.post("/register", registerUser);

// Login User
// POST /api/auth/login
router.post("/login", loginUser);

// ===============================
// Protected Routes
// ===============================

// Get Current Logged-in User
// GET /api/auth/me
router.get("/me", protect, getCurrentUser);

// Logout User
// POST /api/auth/logout
router.post("/logout", protect, logoutUser);

export default router;