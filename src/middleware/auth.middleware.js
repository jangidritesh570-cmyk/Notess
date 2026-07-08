import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ===============================
  // Check Authorization Header
  // ===============================
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ===============================
  // Token Missing
  // ===============================
  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  try {
    // ===============================
    // Verify JWT
    // ===============================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ===============================
    // Find User
    // ===============================
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // ===============================
    // Attach User to Request
    // ===============================
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

export default protect;