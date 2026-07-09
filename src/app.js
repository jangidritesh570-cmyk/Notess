import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Welcome to Notes App API",
  });
});

// Error Middleware (Always Last)
app.use(errorHandler);

export default app;