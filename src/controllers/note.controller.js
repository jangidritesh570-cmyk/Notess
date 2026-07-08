import Note from "../models/Note.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// =======================================
// Create Note
// POST /api/notes
// =======================================
export const createNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const note = await Note.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json(
    new ApiResponse(201, "Note created successfully", note)
  );
});

// =======================================
// Get All Notes of Logged-in User
// GET /api/notes
// =======================================
export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(
      200,
      "Notes fetched successfully",
      notes
    )
  );
});

// =======================================
// Get Single Note
// GET /api/notes/:id
// =======================================
export const getSingleNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Note fetched successfully",
      note
    )
  );
});

// =======================================
// Update Note
// PUT /api/notes/:id
// =======================================
export const updateNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Note updated successfully",
      updatedNote
    )
  );
});

// =======================================
// Delete Note
// DELETE /api/notes/:id
// =======================================
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  await note.deleteOne();

  res.status(200).json(
    new ApiResponse(
      200,
      "Note deleted successfully",
      null
    )
  );
});