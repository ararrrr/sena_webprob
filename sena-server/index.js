require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/useRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://sena-webprob-deploy.vercel.app",
      "https://sena-webprob-frontend.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// Test route
app.get("/", (req, res) => {
  res.send("Sena server API is running");
});

// Routes
app.use("/api/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// For Vercel
module.exports = app;git add .