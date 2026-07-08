import express from "express";

import authRoutes from "./auth.routes.js";
import noteRoutes from "./note.routes.js";

const router = express.Router();

// ===============================
// Auth Routes
// ===============================
router.use("/auth", authRoutes);

// ===============================
// Note Routes
// ===============================
router.use("/notes", noteRoutes);

export default router;