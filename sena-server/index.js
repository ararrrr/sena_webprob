const path = require("path");
const dotenv = require("dotenv");

// Load .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/useRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect MongoDB before every API request
const withDatabase = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Test Route
app.get("/", (req, res) => {
  res.send("Sena Server API is running");
});

// API Routes
app.use("/api/users", withDatabase, userRoutes);
app.use("/api/articles", withDatabase, articleRoutes);

// Optional legacy routes
app.use("/users", withDatabase, userRoutes);
app.use("/articles", withDatabase, articleRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Server Error"
        : err.message,
  });
});

// Local Development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel Export
module.exports = app;