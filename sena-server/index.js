require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/useRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(cors());
app.options('/{*splat}', cors());

// Test route
app.get("/", (req, res) => {
  res.send("Sena server API is running");
});

// Routes
app.use("/api/users", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/users", userRoutes);
app.use("/users", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});
app.use("/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

// For Vercel
module.exports = app;
