import express from "express";

import {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ======================================
// Protect All Note Routes
// ======================================
router.use(protect);

// ======================================
// Create Note & Get All Notes
// ======================================
router
  .route("/")
  .post(createNote)
  .get(getAllNotes);

// ======================================
// Get Single Note, Update & Delete Note
// ======================================
router
  .route("/:id")
  .get(getSingleNote)
  .put(updateNote)
  .delete(deleteNote);

export default router;