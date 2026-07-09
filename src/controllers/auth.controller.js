import User from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ==============================
// Register User
// POST /api/auth/register
// ==============================
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.generateToken();

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  );
});

// ==============================
// Login User
// POST /api/auth/login
// ==============================
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = user.generateToken();

  res.status(200).json(
    new ApiResponse(200, "Login successful", {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  );
});

// ==============================
// Get Current User
// GET /api/auth/me
// ==============================
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", user)
  );
});

// ==============================
// Logout User
// POST /api/auth/logout
// ==============================
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "Logout successful")
  );
});